import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JapaneseDataService } from '../services/data.service';
import { Particle } from '../types';

@Component({
  selector: 'app-particles',
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="min-h-screen bg-slate-950 pb-20">
      <div class="sticky top-0 bg-slate-950 z-20 p-4 border-b border-slate-800 flex items-center gap-4">
        <a routerLink="/" class="text-slate-400 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </a>
        <h1 class="text-xl font-bold text-amber-400">Partikel (助詞)</h1>
      </div>

       <div class="p-4 space-y-4">
         <!-- SEARCH BAR -->
         <div>
           <input type="text" [(ngModel)]="searchQuery" placeholder="Cari partikel, fungsi, atau arti..." 
             class="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-amber-500 outline-none transition placeholder-slate-600" />
         </div>

         <!-- Level Tabs -->
         <div class="flex bg-slate-900 rounded-lg p-1 mb-2 gap-1 overflow-x-auto">
          <button (click)="level.set('N5')" 
            [class]="level() === 'N5' ? 'flex-1 bg-amber-700 text-white rounded py-2 transition font-bold' : 'flex-1 text-slate-400 py-2 transition hover:text-white'">
            N5
          </button>
          <button (click)="level.set('N4')" 
            [class]="level() === 'N4' ? 'flex-1 bg-amber-700 text-white rounded py-2 transition font-bold' : 'flex-1 text-slate-400 py-2 transition hover:text-white'">
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

        @for (p of filteredList(); track p.char + p.usage) {
          <div (click)="selectedParticle.set(p)" class="bg-slate-900 border border-slate-800 rounded-xl p-5 flex gap-4 cursor-pointer hover:border-amber-600 transition group active:scale-[0.98]">
            <div class="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shrink-0 border transition"
                 [class.bg-amber-900_30]="level() === 'N5' || level() === 'N4'" 
                 [class.text-amber-400]="level() === 'N5' || level() === 'N4'"
                 [class.border-amber-900_50]="level() === 'N5' || level() === 'N4'"
                 [class.bg-indigo-900_30]="level() === 'N3'" 
                 [class.text-indigo-400]="level() === 'N3'"
                 [class.border-indigo-900_50]="level() === 'N3'"
                 [class.bg-violet-900_30]="level() === 'N2'" 
                 [class.text-violet-400]="level() === 'N2'"
                 [class.border-violet-900_50]="level() === 'N2'"
                 [class.bg-rose-900_30]="level() === 'N1'" 
                 [class.text-rose-400]="level() === 'N1'"
                 [class.border-rose-900_50]="level() === 'N1'">
              {{ p.char.split(' ')[0] }}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-start">
                 <p class="text-slate-200 font-medium mb-1 truncate pr-2">
                   {{ p.usage }}
                   <!-- Menampilkan Romaji (teks dalam kurung) -->
                   <span class="ml-1 text-sm font-mono" 
                         [class.text-amber-500]="level() === 'N5' || level() === 'N4'"
                         [class.text-indigo-500]="level() === 'N3'"
                         [class.text-violet-500]="level() === 'N2'"
                         [class.text-rose-500]="level() === 'N1'">
                     {{ p.char.includes('(') ? p.char.substring(p.char.indexOf('(')) : '' }}
                   </span>
                 </p>
                 <span class="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700 whitespace-nowrap">Detail &gt;</span>
              </div>
              <p class="text-sm text-slate-500 italic truncate">"{{ p.example }}"</p>
            </div>
          </div>
        } @empty {
          <div class="text-center py-10 text-slate-500">
            Tidak ada partikel yang cocok.
          </div>
        }
      </div>

      <!-- Detail Modal -->
      @if (selectedParticle()) {
        <div class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200" (click)="selectedParticle.set(null)">
          <div class="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md max-h-[90vh] flex flex-col shadow-2xl" (click)="$event.stopPropagation()">
            
            <!-- Header -->
            <div class="p-5 border-b border-slate-800 flex justify-between items-center shrink-0 bg-slate-900 rounded-t-2xl">
               <div class="flex items-center gap-3">
                 <div class="w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-xl shadow-lg"
                      [class.bg-amber-600]="selectedParticle()?.level === 'N5' || selectedParticle()?.level === 'N4'"
                      [class.shadow-amber-900_50]="selectedParticle()?.level === 'N5' || selectedParticle()?.level === 'N4'"
                      [class.bg-indigo-600]="selectedParticle()?.level === 'N3'"
                      [class.shadow-indigo-900_50]="selectedParticle()?.level === 'N3'"
                      [class.bg-violet-600]="selectedParticle()?.level === 'N2'"
                      [class.shadow-violet-900_50]="selectedParticle()?.level === 'N2'"
                      [class.bg-rose-600]="selectedParticle()?.level === 'N1'"
                      [class.shadow-rose-900_50]="selectedParticle()?.level === 'N1'">
                   {{ selectedParticle()?.char?.split(' ')[0] }}
                 </div>
                 <div>
                   <div class="text-xs font-bold uppercase tracking-widest"
                        [class.text-amber-600]="selectedParticle()?.level === 'N5' || selectedParticle()?.level === 'N4'"
                        [class.text-indigo-500]="selectedParticle()?.level === 'N3'"
                        [class.text-violet-500]="selectedParticle()?.level === 'N2'"
                        [class.text-rose-500]="selectedParticle()?.level === 'N1'">
                     PARTIKEL {{ selectedParticle()?.level }}
                   </div>
                   <h2 class="text-lg font-bold text-white leading-tight">
                     {{ selectedParticle()?.usage }}
                     <span class="ml-1 text-base"
                           [class.text-amber-500]="selectedParticle()?.level === 'N5' || selectedParticle()?.level === 'N4'"
                           [class.text-indigo-400]="selectedParticle()?.level === 'N3'"
                           [class.text-violet-400]="selectedParticle()?.level === 'N2'"
                           [class.text-rose-400]="selectedParticle()?.level === 'N1'">
                       {{ selectedParticle()?.char?.includes('(') ? selectedParticle()?.char?.substring(selectedParticle()!.char.indexOf('(')) : '' }}
                     </span>
                   </h2>
                 </div>
               </div>
               <button (click)="selectedParticle.set(null)" class="text-slate-400 hover:text-white p-2 bg-slate-800 rounded-full w-8 h-8 flex items-center justify-center transition">✕</button>
            </div>

            <!-- Content -->
            <div class="p-5 overflow-y-auto no-scrollbar">
              
              <!-- Explanation if available -->
              @if(selectedParticle()?.explanation) {
                <div class="mb-6 bg-slate-950/50 p-4 rounded-xl border border-slate-800 text-slate-300 text-sm leading-relaxed">
                  {{ selectedParticle()?.explanation }}
                </div>
              }

              <!-- Examples -->
              <div>
                <h3 class="text-sm font-bold mb-4 uppercase tracking-wider flex items-center gap-2"
                    [class.text-amber-400]="selectedParticle()?.level === 'N5' || selectedParticle()?.level === 'N4'"
                    [class.text-indigo-400]="selectedParticle()?.level === 'N3'"
                    [class.text-violet-400]="selectedParticle()?.level === 'N2'"
                    [class.text-rose-400]="selectedParticle()?.level === 'N1'">
                  <span>📝</span> Contoh Kalimat
                </h3>

                <div class="space-y-4">
                  @if (selectedParticle()?.examples && selectedParticle()!.examples!.length > 0) {
                    @for (ex of selectedParticle()?.examples; track ex.japanese) {
                      <div class="bg-slate-800/50 rounded-xl p-4 border border-slate-800 hover:border-slate-700 transition">
                        <!-- Japanese -->
                        <div class="text-lg text-white font-medium mb-1 border-l-4 pl-3"
                             [class.border-amber-500]="selectedParticle()?.level === 'N5' || selectedParticle()?.level === 'N4'"
                             [class.border-indigo-500]="selectedParticle()?.level === 'N3'"
                             [class.border-violet-500]="selectedParticle()?.level === 'N2'"
                             [class.border-rose-500]="selectedParticle()?.level === 'N1'">
                          {{ ex.japanese }}
                        </div>
                        <!-- Romaji -->
                        <div class="text-xs text-slate-400 font-mono mb-2 pl-4 italic">
                          {{ ex.romaji }}
                        </div>
                        <!-- Meaning -->
                        <div class="text-sm text-slate-300/90 pl-4 font-medium">
                          {{ ex.meaning }}
                        </div>
                      </div>
                    }
                  } @else {
                    <!-- Fallback -->
                    <div class="bg-slate-800/50 rounded-xl p-4 border border-slate-800">
                      <div class="text-lg text-white font-medium border-l-4 pl-3"
                           [class.border-amber-500]="selectedParticle()?.level === 'N5' || selectedParticle()?.level === 'N4'"
                           [class.border-indigo-500]="selectedParticle()?.level === 'N3'"
                           [class.border-violet-500]="selectedParticle()?.level === 'N2'"
                           [class.border-rose-500]="selectedParticle()?.level === 'N1'">
                         {{ selectedParticle()?.example }}
                      </div>
                      <div class="text-sm text-slate-400 mt-2 pl-4 italic">Contoh singkat dari daftar.</div>
                    </div>
                  }
                </div>
              </div>

            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class ParticlesComponent {
  dataService = inject(JapaneseDataService);
  level = signal<'N5' | 'N4' | 'N3' | 'N2' | 'N1'>('N5');
  selectedParticle = signal<Particle | null>(null);
  searchQuery = signal('');

  filteredList = computed(() => {
    const rawList = this.dataService.getParticles(this.level());
    const query = this.searchQuery().toLowerCase().trim();

    if (!query) return rawList;

    return rawList.filter(p => 
      p.char.toLowerCase().includes(query) ||
      p.usage.toLowerCase().includes(query) ||
      (p.explanation && p.explanation.toLowerCase().includes(query)) ||
      p.example.toLowerCase().includes(query)
    );
  });
}