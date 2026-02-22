import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TtsService {
  private synth = window.speechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];
  
  // Signal untuk status sedang berbicara (bisa digunakan untuk animasi ikon)
  isSpeaking = signal(false);

  // Regex untuk mendeteksi karakter Jepang (Hiragana, Katakana, Kanji, Zenkaku punctuation)
  // Range mencakup: Punctuation CJK, Hiragana, Katakana, Full-width Romaji, CJK Unified Ideographs (Kanji)
  private jpRegex = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;

  constructor() {
    // Load voices saat inisialisasi
    if (typeof window !== 'undefined') {
      this.loadVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    this.voices = this.synth.getVoices();
  }

  /**
   * Memutar suara teks dengan deteksi bahasa otomatis per segmen.
   * Cocok untuk kalimat campuran "Apa arti 食べる?"
   * @param text Teks yang akan dibaca
   * @param defaultLang Bahasa dasar (fallback) jika tidak terdeteksi Jepang. Default 'id-ID'.
   */
  speak(text: string, defaultLang: 'id-ID' | 'ja-JP' = 'id-ID') {
    if (!text) return;

    // Hentikan suara sebelumnya
    this.cancel();

    // 1. Pre-processing Teks
    // Mengganti underscore/isian kosong dengan jeda atau kata
    let processedText = text;
    
    // Pattern untuk menangkap isian kosong (____)
    const blankPattern = /([_＿\s　★☆]*[_＿]+[_＿\s　★☆]*)/g;
    
    // Ganti blank dengan jeda
    processedText = processedText.replace(blankPattern, ' ... '); 
    
    if (defaultLang === 'id-ID') {
       // Bersihkan slash agar dibaca 'atau'
       processedText = processedText.replace(/\//g, ' atau ');
    }

    // 2. Segmentasi Teks (Split Indo & Jepang)
    const segments = this.segmentText(processedText, defaultLang);

    // 3. Eksekusi Queue Suara
    // Kita set event listener pada utterance terakhir untuk mematikan signal isSpeaking
    
    segments.forEach((seg, index) => {
      const utterance = new SpeechSynthesisUtterance(seg.text);
      utterance.lang = seg.lang;
      utterance.rate = seg.lang === 'ja-JP' ? 0.85 : 0.9; // Jepang sedikit lebih lambat agar jelas
      
      // Pilih suara terbaik
      const voice = this.getBestVoice(seg.lang);
      if (voice) {
        utterance.voice = voice;
      }

      // Event Handlers
      if (index === 0) {
        utterance.onstart = () => this.isSpeaking.set(true);
      }
      
      if (index === segments.length - 1) {
        utterance.onend = () => this.isSpeaking.set(false);
        utterance.onerror = () => this.isSpeaking.set(false);
      }

      this.synth.speak(utterance);
    });
  }

  cancel() {
    if (this.synth.speaking) {
      this.synth.cancel();
      this.isSpeaking.set(false);
    }
  }

  /**
   * Memecah string menjadi array segmen bahasa.
   * Contoh: "Apa arti 食べる?" -> 
   * [ {text: "Apa arti ", lang: 'id-ID'}, {text: "食べる", lang: 'ja-JP'}, {text: "?", lang: 'id-ID'} ]
   */
  private segmentText(text: string, baseLang: string): { text: string, lang: string }[] {
    const segments: { text: string, lang: string }[] = [];
    let currentText = '';
    let currentIsJp = false;

    // Helper untuk cek apakah char adalah Jepang
    const isJpChar = (char: string) => this.jpRegex.test(char);

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const isJp = isJpChar(char);

      // Logika Penanganan Spasi & Tanda Baca Latin:
      // Spasi/Tanda baca latin biasanya dianggap netral.
      // Kita ikutkan ke segmen sebelumnya agar tidak memutus aliran kalimat secara aneh.
      // KECUALI jika itu adalah karakter Jepang yang jelas.
      
      // Cek apakah ini awal iterasi
      if (i === 0) {
        currentIsJp = isJp;
        currentText += char;
        continue;
      }

      // Deteksi pergantian bahasa
      // Jika karakter adalah Netral (spasi, titik, koma latin, angka latin), 
      // jangan paksa ganti bahasa, gabung saja ke chunk sekarang.
      // Ganti bahasa HANYA jika kita yakin karakter ini punya bahasa spesifik (Latin Text vs Kanji/Kana)
      
      // Apakah karakter ini secara TEGAS berbeda jenis bahasanya dengan chunk sekarang?
      const charCode = char.charCodeAt(0);
      const isNeutral = (charCode >= 0 && charCode <= 64) || (charCode >= 91 && charCode <= 96) || (charCode >= 123 && charCode <= 126); // ASCII Punctuation & Space

      if (isNeutral) {
        // Karakter netral ikut segmen sebelumnya
        currentText += char;
      } else {
        if (isJp !== currentIsJp) {
          // Bahasa berubah! Push segmen sebelumnya
          segments.push({
            text: currentText,
            lang: currentIsJp ? 'ja-JP' : baseLang
          });
          
          // Reset untuk segmen baru
          currentText = char;
          currentIsJp = isJp;
        } else {
          // Bahasa sama, lanjutkan
          currentText += char;
        }
      }
    }

    // Push sisa segmen terakhir
    if (currentText.length > 0) {
      segments.push({
        text: currentText,
        lang: currentIsJp ? 'ja-JP' : baseLang
      });
    }

    return segments;
  }

  private getBestVoice(lang: string): SpeechSynthesisVoice | null {
    // Filter suara berdasarkan bahasa
    const available = this.voices.filter(v => v.lang.replace('_', '-').includes(lang));
    
    if (available.length === 0) return null;

    // Prioritas Suara (Kualitas Bagus)
    // 1. Google (Biasanya natural)
    let best = available.find(v => v.name.includes('Google'));
    
    // 2. Microsoft (Biasanya jelas)
    if (!best) best = available.find(v => v.name.includes('Microsoft'));
    
    // 3. Apple (Siri / Kyoko / Damayanti)
    if (!best) best = available.find(v => v.name.includes('Siri') || v.name.includes('Kyoko') || v.name.includes('Damayanti'));

    // Fallback: Ambil yang pertama tersedia
    return best || available[0];
  }
}