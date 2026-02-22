import { Injectable, signal, computed } from '@angular/core';

export type LanguageCode = 'ID' | 'EN' | 'VI' | 'TH' | 'PH' | 'MY';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  // State
  currentLang = signal<LanguageCode>('ID');
  isDarkMode = signal<boolean>(true); // Default true (Dark Mode)

  // Dictionary
  private dictionary: Record<LanguageCode, Record<string, string>> = {
    ID: {
      'app.name': 'NihongoQuest',
      'nav.home': 'Beranda',
      'nav.vocab': 'Kamus',
      'nav.writing': 'Menulis',
      'nav.profile': 'Profil',
      'nav.settings': 'Pengaturan',
      'home.search_placeholder': 'Cari kanji, kosakata...',
      'home.start_learning': 'Mulai Belajar',
      'home.menu.kana': 'Kana',
      'home.menu.kanji': 'Kanji',
      'home.menu.grammar': 'Tata Bahasa',
      'home.menu.particles': 'Partikel',
      'home.menu.writing': 'Menulis',
      'home.menu.vocab': 'Kosakata',
      'home.menu.quiz': 'Latihan Soal',
      'home.menu.flashcard': 'Flashcard',
      'flashcard.title': 'Flashcard',
      'flashcard.choose_deck': 'Pilih Dek Kartu',
      'flashcard.hiragana_deck': 'Dek Hiragana',
      'flashcard.katakana_deck': 'Dek Katakana',
      'flashcard.kanji_deck': 'Dek Kanji',
      'flashcard.vocab_deck': 'Dek Kosakata',
      'flashcard.shuffle': 'Acak Kartu',
      'flashcard.card': 'Kartu',
      'flashcard.of': 'dari',
      'flashcard.previous': 'Sebelumnya',
      'flashcard.next': 'Selanjutnya',
      'flashcard.back_to_menu': 'Kembali ke Menu',
      'flashcard.custom_deck': 'Buat Dek Baru',
      'flashcard.custom_deck_desc': 'Buat & simpan dek kustom Anda',
      'flashcard.config_title': 'Editor Dek Kustom',
      'flashcard.select_sources': 'Pilih Sumber Kartu',
      'flashcard.card_quantity': 'Jumlah Kartu (1-500)',
      'flashcard.start_session': 'Mulai Sesi',
      'flashcard.select_all': 'Pilih Semua',
      'flashcard.deselect_all': 'Hapus Semua',
      'flashcard.deck_name': 'Nama Dek',
      'flashcard.add_cards': 'Tambah Kartu',
      'flashcard.save_deck': 'Simpan Dek',
      'flashcard.update_deck': 'Perbarui Dek',
      'flashcard.my_decks': 'Dek Kustom Saya',
      'flashcard.search_to_add': 'Cari Kana, Kanji, Kosakata...',
      'flashcard.add': 'Tambah',
      'flashcard.added': 'Ditambahkan',
      'flashcard.back_to_builder': 'Kembali ke Editor',
      'flashcard.delete': 'Hapus',
      'flashcard.delete_confirm': 'Yakin ingin menghapus dek "{deckName}"?',
      'flashcard.edit': 'Edit',
      'flashcard.start': 'Mulai',
      'flashcard.no_custom_decks': 'Belum ada dek kustom. Buat satu!',
      'flashcard.cards_in_deck': 'Kartu di Dalam Dek',
      'flashcard.browse_by_deck': 'Jelajahi berdasarkan Dek',
      'flashcard.clear_category': 'Hapus Filter',
      'flashcard.select_category_prompt': 'Pilih kategori di atas untuk melihat daftar kartu.',
      'flashcard.romaji_toggle': 'Romaji',
      'settings.title': 'Pengaturan',
      'settings.language': 'Bahasa Aplikasi',
      'settings.theme': 'Tampilan',
      'settings.dark_mode': 'Mode Gelap',
      'settings.about': 'Tentang Aplikasi',
      'settings.reset': 'Reset Progress',
      'settings.reset_confirm': 'Apakah Anda yakin ingin menghapus semua progress?',
      'quiz.title': 'Latihan & Ujian',
      'quiz.start': 'Mulai',
      'quiz.score': 'Skor',
      'quiz.menu.particle': 'Latihan Partikel',
      'quiz.menu.particle_desc': 'Isi partikel yang tepat',
      'common.level': 'Level',
      'common.search': 'Cari...',
      'common.back': 'Kembali'
    },
    EN: {
      'app.name': 'NihongoQuest',
      'nav.home': 'Home',
      'nav.vocab': 'Vocab',
      'nav.writing': 'Write',
      'nav.profile': 'Profile',
      'nav.settings': 'Settings',
      'home.search_placeholder': 'Search Kanji, Vocab...',
      'home.start_learning': 'Start Learning',
      'home.menu.kana': 'Kana',
      'home.menu.kanji': 'Kanji',
      'home.menu.grammar': 'Grammar',
      'home.menu.particles': 'Particles',
      'home.menu.writing': 'Writing',
      'home.menu.vocab': 'Vocabulary',
      'home.menu.quiz': 'Quiz',
      'home.menu.flashcard': 'Flashcard',
      'flashcard.title': 'Flashcard',
      'flashcard.choose_deck': 'Choose a Deck',
      'flashcard.hiragana_deck': 'Hiragana Deck',
      'flashcard.katakana_deck': 'Katakana Deck',
      'flashcard.kanji_deck': 'Kanji Deck',
      'flashcard.vocab_deck': 'Vocab Deck',
      'flashcard.shuffle': 'Shuffle Cards',
      'flashcard.card': 'Card',
      'flashcard.of': 'of',
      'flashcard.previous': 'Previous',
      'flashcard.next': 'Next',
      'flashcard.back_to_menu': 'Back to Menu',
      'flashcard.custom_deck': 'New Custom Deck',
      'flashcard.custom_deck_desc': 'Create & save your own decks',
      'flashcard.config_title': 'Custom Deck Editor',
      'flashcard.select_sources': 'Select Card Sources',
      'flashcard.card_quantity': 'Number of Cards (1-500)',
      'flashcard.start_session': 'Start Session',
      'flashcard.select_all': 'Select All',
      'flashcard.deselect_all': 'Deselect All',
      'flashcard.deck_name': 'Deck Name',
      'flashcard.add_cards': 'Add Cards',
      'flashcard.save_deck': 'Save Deck',
      'flashcard.update_deck': 'Update Deck',
      'flashcard.my_decks': 'My Custom Decks',
      'flashcard.search_to_add': 'Search Kana, Kanji, Vocab...',
      'flashcard.add': 'Add',
      'flashcard.added': 'Added',
      'flashcard.back_to_builder': 'Back to Editor',
      'flashcard.delete': 'Delete',
      'flashcard.delete_confirm': 'Are you sure you want to delete deck "{deckName}"?',
      'flashcard.edit': 'Edit',
      'flashcard.start': 'Start',
      'flashcard.no_custom_decks': 'No custom decks yet. Create one!',
      'flashcard.cards_in_deck': 'Cards in Deck',
      'flashcard.browse_by_deck': 'Browse by Deck',
      'flashcard.clear_category': 'Clear Filter',
      'flashcard.select_category_prompt': 'Select a category above to see the card list.',
      'flashcard.romaji_toggle': 'Romaji',
      'settings.title': 'Settings',
      'settings.language': 'App Language',
      'settings.theme': 'Appearance',
      'settings.dark_mode': 'Dark Mode',
      'settings.about': 'About App',
      'settings.reset': 'Reset Progress',
      'settings.reset_confirm': 'Are you sure you want to reset all progress?',
      'quiz.title': 'Practice & Exam',
      'quiz.start': 'Start',
      'quiz.score': 'Score',
      'quiz.menu.particle': 'Particle Practice',
      'quiz.menu.particle_desc': 'Fill in the correct particle',
      'common.level': 'Level',
      'common.search': 'Search...',
      'common.back': 'Back'
    },
    VI: { // ... shortened for brevity
      'app.name': 'NihongoQuest', 'nav.home': 'Trang chủ', 'flashcard.title': 'Thẻ ghi nhớ', 'flashcard.my_decks': 'Bộ bài của tôi', 'flashcard.save_deck': 'Lưu bộ bài'
    },
    TH: { // ... shortened for brevity
      'app.name': 'NihongoQuest', 'nav.home': 'หน้าแรก', 'flashcard.title': 'แฟลชการ์ด', 'flashcard.my_decks': 'สำรับของฉัน', 'flashcard.save_deck': 'บันทึกสำรับ'
    },
    PH: { // ... shortened for brevity
      'app.name': 'NihongoQuest', 'nav.home': 'Home', 'flashcard.title': 'Flashcard', 'flashcard.my_decks': 'Aking Mga Deck', 'flashcard.save_deck': 'I-save ang Deck'
    },
    MY: { // ... shortened for brevity
      'app.name': 'NihongoQuest', 'nav.home': 'Utama', 'flashcard.title': 'Kad Imbas', 'flashcard.my_decks': 'Dek Saya', 'flashcard.save_deck': 'Simpan Dek'
    }
  };

  constructor() {
    // Load saved settings if any
    const savedLang = localStorage.getItem('app_lang') as LanguageCode;
    if (savedLang && this.dictionary[savedLang]) {
      this.currentLang.set(savedLang);
    }

    const savedTheme = localStorage.getItem('app_theme');
    if (savedTheme) {
      this.isDarkMode.set(savedTheme === 'dark');
    }
  }

  setLanguage(lang: LanguageCode) {
    this.currentLang.set(lang);
    localStorage.setItem('app_lang', lang);
  }

  toggleTheme() {
    this.isDarkMode.update(v => !v);
    localStorage.setItem('app_theme', this.isDarkMode() ? 'dark' : 'light');
  }

  // Get translated text
  get(key: string): string {
    const lang = this.currentLang();
    // Fallback to English if key not found in current language, then fallback to key itself
    return this.dictionary[lang][key] || this.dictionary['EN'][key] || key;
  }


  // Helper untuk mendapatkan nama bahasa
  getLangName(code: LanguageCode): string {
    switch(code) {
      case 'ID': return 'Bahasa Indonesia';
      case 'EN': return 'English';
      case 'VI': return 'Tiếng Việt';
      case 'TH': return 'ไทย (Thai)';
      case 'PH': return 'Filipino';
      case 'MY': return 'Bahasa Melayu';
      default: return code;
    }
  }
}