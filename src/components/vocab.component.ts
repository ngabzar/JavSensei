import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JapaneseDataService } from '../services/data.service';
import { Vocab } from '../types';
import { KanaToRomajiPipe } from '../pipes/kana-to-romaji.pipe';
import { TtsService } from '../services/tts.service';

@Component({
  selector: 'app-vocab',
  imports: [CommonModule, RouterLink, FormsModule, KanaToRomajiPipe],
  template: `
    <div class="min-h-screen bg-slate-950 pb-20">
      <div class="sticky top-0 bg-slate-950 z-20 p-4 border-b border-slate-800 flex items-center gap-4">
        <a routerLink="/" class="text-slate-400 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </a>
        <h1 class="text-xl font-bold text-cyan-400">Kosakata</h1>
      </div>

       <div class="p-4 space-y-4">
         <!-- SEARCH BAR -->
         <div>
           <input type="text" [(ngModel)]="searchQuery" placeholder="Cari kata (Jepang/Indo)..." 
             class="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition placeholder-slate-600" />
         </div>

         <!-- Level Selector -->
         <div class="flex bg-slate-900 rounded-lg p-1 gap-1 overflow-x-auto">
          <button (click)="level.set('N5')" 
            [class]="level() === 'N5' ? 'flex-1 bg-cyan-700 text-white rounded py-2 transition font-bold' : 'flex-1 text-slate-400 py-2 transition hover:text-white'">
            N5
          </button>
          <button (click)="level.set('N4')" 
            [class]="level() === 'N4' ? 'flex-1 bg-cyan-700 text-white rounded py-2 transition font-bold' : 'flex-1 text-slate-400 py-2 transition hover:text-white'">
            N4
          </button>
          <button (click)="level.set('N3')" 
            [class]="level() === 'N3' ? 'flex-1 bg-indigo-600 text-white rounded py-2 transition font-bold' : 'flex-1 text-slate-400 py-2 transition hover:text-white'">
            N3
          </button>
          <button (click)="level.set('N2')" 
            [class]="level() === 'N2' ? 'flex-1 bg-violet-600 text-white rounded py-2 transition font-bold' : 'flex-1 text-slate-400 py-2 transition hover:text-white'">
            N2
          </button>
          <button (click)="level.set('N1')" 
            [class]="level() === 'N1' ? 'flex-1 bg-rose-600 text-white rounded py-2 transition font-bold' : 'flex-1 text-slate-400 py-2 transition hover:text-white'">
            N1
          </button>
        </div>

        <!-- Category Sub-Menu -->
        <div class="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          <button (click)="category.set('ALL')" 
            [class]="category() === 'ALL' ? 'px-4 py-1.5 rounded-full text-sm font-medium bg-cyan-900 text-cyan-200 border border-cyan-700 whitespace-nowrap' : 'px-4 py-1.5 rounded-full text-sm font-medium bg-slate-900 text-slate-400 border border-slate-800 whitespace-nowrap hover:border-slate-600'">
            Semua
          </button>
          <button (click)="category.set('NOUN')" 
            [class]="category() === 'NOUN' ? 'px-4 py-1.5 rounded-full text-sm font-medium bg-cyan-900 text-cyan-200 border border-cyan-700 whitespace-nowrap' : 'px-4 py-1.5 rounded-full text-sm font-medium bg-slate-900 text-slate-400 border border-slate-800 whitespace-nowrap hover:border-slate-600'">
            Kata Benda
          </button>
          <button (click)="category.set('VERB')" 
            [class]="category() === 'VERB' ? 'px-4 py-1.5 rounded-full text-sm font-medium bg-cyan-900 text-cyan-200 border border-cyan-700 whitespace-nowrap' : 'px-4 py-1.5 rounded-full text-sm font-medium bg-slate-900 text-slate-400 border border-slate-800 whitespace-nowrap hover:border-slate-600'">
            Kata Kerja
          </button>
          <button (click)="category.set('ADJ')" 
            [class]="category() === 'ADJ' ? 'px-4 py-1.5 rounded-full text-sm font-medium bg-cyan-900 text-cyan-200 border border-cyan-700 whitespace-nowrap' : 'px-4 py-1.5 rounded-full text-sm font-medium bg-slate-900 text-slate-400 border border-slate-800 whitespace-nowrap hover:border-slate-600'">
            Kata Sifat
          </button>
          <button (click)="category.set('OTHER')" 
            [class]="category() === 'OTHER' ? 'px-4 py-1.5 rounded-full text-sm font-medium bg-cyan-900 text-cyan-200 border border-cyan-700 whitespace-nowrap' : 'px-4 py-1.5 rounded-full text-sm font-medium bg-slate-900 text-slate-400 border border-slate-800 whitespace-nowrap hover:border-slate-600'">
            Lain-lain
          </button>
        </div>

        <!-- List -->
        @for (v of filteredList(); track v.word) {
          <div class="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-cyan-700 transition">
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-1">
                  <div class="text-xl text-white font-bold">{{ v.word }}</div>
                  <!-- Speaker Button JP -->
                  <button (click)="tts.speak(v.word, 'ja-JP')" class="p-1.5 bg-slate-800 rounded-full text-cyan-400 hover:bg-cyan-900 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                      <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 2.485.519 4.952 1.848 6.595.342 1.241 1.519 1.905 2.66 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 1 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
                      <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
                    </svg>
                  </button>
                </div>
                <div class="text-sm text-cyan-400 mt-0.5">
                  {{ v.kana }} 
                  <span class="text-slate-600 mx-1">-</span> 
                  <span class="text-slate-400 italic">{{ v.kana | kanaToRomaji }}</span>
                </div>
              </div>
              <div class="text-right flex flex-col items-end">
                <div class="flex items-center gap-2">
                   <div class="text-slate-300 font-medium">{{ v.meaning }}</div>
                </div>
                
                <!-- Category Badge -->
                <span [class]="getBadgeClass(v)">
                  {{ getBadgeLabel(v) }}
                </span>
              </div>
            </div>
            
            <!-- Example Sentences -->
            @if (v.examples && v.examples.length > 0) {
              <div class="mt-3 pt-3 border-t border-slate-800 space-y-2">
                <div class="text-xs text-slate-500 uppercase tracking-wide font-semibold">Contoh Kalimat</div>
                @for (ex of v.examples; track ex.japanese) {
                  <div class="bg-slate-800 rounded-lg p-2.5 text-sm">
                    <div class="flex items-start gap-2">
                      <button (click)="tts.speak(ex.japanese, 'ja-JP')" class="mt-0.5 p-1 bg-slate-700 rounded-full text-cyan-500 hover:bg-cyan-900 transition flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3">
                          <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 2.485.519 4.952 1.848 6.595.342 1.241 1.519 1.905 2.66 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 1 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
                        </svg>
                      </button>
                      <div class="flex-1">
                        <div class="text-white font-medium leading-snug">{{ ex.japanese }}</div>
                        <div class="text-slate-500 text-xs mt-0.5 italic">{{ ex.romaji }}</div>
                        <div class="text-cyan-300 text-xs mt-0.5">{{ ex.meaning }}</div>
                      </div>
                    </div>
                  </div>
                }
              </div>
            }
          </div>
        } @empty {
          <div class="text-center py-10 text-slate-500">
            Tidak ada kosakata di kategori ini.
          </div>
        }
      </div>
    </div>
  `
})
export class VocabComponent {
  dataService = inject(JapaneseDataService);
  tts = inject(TtsService); // Inject TTS
  level = signal<'N5' | 'N4' | 'N3' | 'N2' | 'N1'>('N5');
  category = signal<'ALL' | 'NOUN' | 'VERB' | 'ADJ' | 'OTHER'>('ALL');
  searchQuery = signal('');

  filteredList = computed(() => {
    const all = this.dataService.getVocab(this.level());
    const cat = this.category();
    const query = this.searchQuery().toLowerCase().trim();

    // 1. Filter by Category
    let list = all;
    if (cat !== 'ALL') {
      list = all.filter(v => {
        const vCat = v.category || 'NOUN'; 
        return vCat === cat;
      });
    }

    // 2. Filter by Search Query
    if (query) {
      list = list.filter(v => 
        v.word.toLowerCase().includes(query) ||
        v.kana.includes(query) ||
        v.meaning.toLowerCase().includes(query)
      );
    }

    return list;
  });

  // Helpers untuk Badge
  getBadgeLabel(v: Vocab): string {
    const cat = v.category || 'NOUN';
    switch(cat) {
      case 'NOUN': return 'Kata Benda';
      case 'VERB': return 'Kata Kerja';
      case 'ADJ': return 'Kata Sifat';
      case 'OTHER': return 'Lain-lain';
      default: return 'Kata Benda';
    }
  }

  getBadgeClass(v: Vocab): string {
    const cat = v.category || 'NOUN';
    const base = "text-[10px] px-2 py-0.5 rounded mt-1.5 inline-block font-medium border ";
    
    switch(cat) {
      case 'NOUN': 
        return base + "bg-slate-800 text-slate-400 border-slate-700";
      case 'VERB': 
        return base + "bg-blue-950/50 text-blue-400 border-blue-900";
      case 'ADJ': 
        return base + "bg-amber-950/50 text-amber-400 border-amber-900";
      case 'OTHER': 
        return base + "bg-rose-950/50 text-rose-400 border-rose-900";
      default: 
        return base + "bg-slate-800 text-slate-400 border-slate-700";
    }
  }
}