import { Component, inject, signal, computed, OnInit, ViewChild, ElementRef, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../services/translation.service';
import { JapaneseDataService } from '../services/data.service';
import { Kana, Kanji, Vocab } from '../types';
import { KanaToRomajiPipe } from '../pipes/kana-to-romaji.pipe';
import { TtsService } from '../services/tts.service';

type DeckType =
  | 'HIRAGANA' | 'KATAKANA'
  | 'KANJI_N5' | 'KANJI_N4' | 'KANJI_N3' | 'KANJI_N2' | 'KANJI_N1'
  | 'VOCAB_N5' | 'VOCAB_N4' | 'VOCAB_N3' | 'VOCAB_N2' | 'VOCAB_N1';

interface FlashcardItem {
  front: string;
  back: string;
  sub?: string;
  example?: string;
  exampleMeaning?: string;
}

interface SavedDeck {
  id: number;
  name: string;
  cards: FlashcardItem[];
}

@Component({
  selector: 'app-flashcard',
  imports: [CommonModule, RouterLink, FormsModule, KanaToRomajiPipe],
  providers: [KanaToRomajiPipe],
  styles: [`
    .card-container { perspective: 1000px; }
    .card-inner {
      position: relative; width: 100%; height: 100%;
      transition: transform 0.6s; transform-style: preserve-3d;
    }
    .card-container.flipped .card-inner { transform: rotateY(180deg); }
    .card-front, .card-back {
      position: absolute; width: 100%; height: 100%;
      -webkit-backface-visibility: hidden; backface-visibility: hidden;
      display: flex; flex-direction: column; align-items: center;
      justify-content: center; padding: 1.5rem; text-align: center;
    }
    .card-back { transform: rotateY(180deg); }

    .speaking-bar { animation: barPulse 1.2s ease-in-out infinite; }
    @keyframes barPulse {
      0%, 100% { transform: scaleY(0.4); }
      50%       { transform: scaleY(1); }
    }

    .mini-toggle {
      width: 2.5rem; height: 1.4rem; border-radius: 9999px;
      position: relative; transition: background-color 0.2s;
      flex-shrink: 0; cursor: pointer; border: none; outline: none;
    }
    .mini-thumb {
      width: 1.05rem; height: 1.05rem; background: white; border-radius: 9999px;
      position: absolute; top: 0.175rem; transition: left 0.2s;
      box-shadow: 0 1px 3px rgba(0,0,0,0.35);
    }
    .mini-thumb.on  { left: 1.3rem; }
    .mini-thumb.off { left: 0.15rem; }
  `],
  template: `
    <div class="min-h-screen pb-24 transition-colors"
         [class.bg-slate-950]="ts.isDarkMode()" [class.bg-gray-50]="!ts.isDarkMode()">

      <!-- ── Header ──────────────────────────────────────────── -->
      <div class="sticky top-0 z-20 p-4 border-b flex items-center gap-4 transition-colors"
           [class.bg-slate-950]="ts.isDarkMode()" [class.border-slate-800]="ts.isDarkMode()"
           [class.bg-white]="!ts.isDarkMode()" [class.border-gray-200]="!ts.isDarkMode()">
        <button (click)="goBack()" class="transition-colors"
                [class.text-slate-400]="ts.isDarkMode()" [class.text-slate-500]="!ts.isDarkMode()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
          </svg>
        </button>
        <h1 class="text-xl font-bold"
            [class.text-yellow-400]="ts.isDarkMode()" [class.text-yellow-600]="!ts.isDarkMode()">
          {{ headerTitle() }}
        </h1>
      </div>

      <div class="p-4">

        <!-- ══════════════════════════════════════
             MENU
             ══════════════════════════════════════ -->
        @if (view() === 'menu') {
          <div class="animate-in fade-in duration-300 space-y-4">

            <button (click)="startBuildingNewDeck()"
                    class="w-full p-4 rounded-xl border-2 border-dashed transition-colors text-left"
                    [class.border-yellow-500/40]="ts.isDarkMode()"
                    [class.hover:bg-yellow-950/40]="ts.isDarkMode()"
                    [class.hover:border-yellow-500/70]="ts.isDarkMode()"
                    [class.border-yellow-300]="!ts.isDarkMode()"
                    [class.hover:bg-yellow-50]="!ts.isDarkMode()"
                    [class.hover:border-yellow-400]="!ts.isDarkMode()">
              <div class="flex items-center gap-4">
                <div class="text-3xl">🎨</div>
                <div>
                  <div class="font-bold text-lg"
                       [class.text-yellow-400]="ts.isDarkMode()"
                       [class.text-yellow-700]="!ts.isDarkMode()">
                    {{ ts.get('flashcard.custom_deck') }}
                  </div>
                  <div class="text-xs opacity-70">{{ ts.get('flashcard.custom_deck_desc') }}</div>
                </div>
              </div>
            </button>

            <h2 class="text-lg font-semibold pt-4 opacity-80">{{ ts.get('flashcard.choose_deck') }}</h2>
            <div class="grid grid-cols-2 gap-3">
              @for (deck of predefinedDecks; track deck.type) {
                <button (click)="startSession(deck.type)"
                        class="p-4 rounded-xl border transition-colors text-left"
                        [class.bg-slate-900]="ts.isDarkMode()"
                        [class.border-slate-800]="ts.isDarkMode()"
                        [class.hover:border-rose-500]="ts.isDarkMode()"
                        [class.bg-white]="!ts.isDarkMode()"
                        [class.border-gray-200]="!ts.isDarkMode()"
                        [class.hover:border-rose-400]="!ts.isDarkMode()">
                  <div class="text-3xl font-bold" [class]="deck.color">{{ deck.char }}</div>
                  <div class="font-bold mt-2">{{ getDeckName(deck.type) }}</div>
                </button>
              }
            </div>

            <!-- Shuffle on menu -->
            <div class="mt-6 p-4 rounded-xl border flex items-center justify-between"
                 [class.bg-slate-900]="ts.isDarkMode()" [class.border-slate-800]="ts.isDarkMode()"
                 [class.bg-white]="!ts.isDarkMode()" [class.border-gray-200]="!ts.isDarkMode()">
              <label class="font-medium">{{ ts.get('flashcard.shuffle') }}</label>
              <button class="mini-toggle" (click)="shuffle.set(!shuffle())"
                      [class.bg-orange-500]="shuffle()"
                      [class.bg-gray-400]="!shuffle() && !ts.isDarkMode()"
                      [class.bg-slate-700]="!shuffle() && ts.isDarkMode()">
                <div class="mini-thumb" [class.on]="shuffle()" [class.off]="!shuffle()"></div>
              </button>
            </div>

            <h2 class="text-lg font-semibold pt-4 opacity-80">{{ ts.get('flashcard.my_decks') }}</h2>
            <div class="space-y-3">
              @for (deck of savedDecks(); track deck.id) {
                <div class="p-4 rounded-xl border flex items-center justify-between"
                     [class.bg-slate-900]="ts.isDarkMode()" [class.border-slate-800]="ts.isDarkMode()"
                     [class.bg-white]="!ts.isDarkMode()" [class.border-gray-200]="!ts.isDarkMode()">
                  <div>
                    <div class="font-bold">{{ deck.name }}</div>
                    <div class="text-xs opacity-60">{{ deck.cards.length }} {{ ts.get('flashcard.card') }}</div>
                  </div>
                  <div class="flex gap-2">
                    <button (click)="startSavedDeckSession(deck)"
                            class="px-4 py-2 text-sm font-bold rounded-lg bg-yellow-600 text-black hover:bg-yellow-500 transition">
                      {{ ts.get('flashcard.start') }}
                    </button>
                    <button (click)="editDeck(deck)"
                            class="p-2 rounded-lg bg-slate-800 hover:bg-blue-900/50 text-blue-400 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z"/>
                        <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z"/>
                      </svg>
                    </button>
                    <button (click)="deleteDeck(deck)"
                            class="p-2 rounded-lg bg-slate-800 hover:bg-red-900/50 text-red-400 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.58.22-2.365.468a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193v-.443A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clip-rule="evenodd"/>
                      </svg>
                    </button>
                  </div>
                </div>
              } @empty {
                <div class="text-center text-sm opacity-60 p-6 border-2 border-dashed rounded-xl"
                     [class.border-slate-800]="ts.isDarkMode()"
                     [class.border-gray-200]="!ts.isDarkMode()">
                  {{ ts.get('flashcard.no_custom_decks') }}
                </div>
              }
            </div>
          </div>
        }

        <!-- ══════════════════════════════════════
             CONFIG
             ══════════════════════════════════════ -->
        @if (view() === 'config') {
          <div class="animate-in fade-in duration-300 space-y-6">
            <section>
              <label for="deckName" class="font-bold mb-2 block">{{ ts.get('flashcard.deck_name') }}</label>
              <input id="deckName" type="text" [(ngModel)]="customDeckName"
                     class="w-full p-3 rounded-lg border-2"
                     [class.bg-slate-900]="ts.isDarkMode()" [class.border-slate-700]="ts.isDarkMode()"
                     [class.bg-white]="!ts.isDarkMode()" [class.border-gray-200]="!ts.isDarkMode()">
            </section>
            <section>
              <h3 class="font-bold mb-2">{{ ts.get('flashcard.cards_in_deck') }} ({{ customDeckCards().length }})</h3>
              <div class="space-y-2 max-h-60 overflow-y-auto rounded-lg p-2 border"
                   [class.bg-slate-950/50]="ts.isDarkMode()" [class.border-slate-800]="ts.isDarkMode()">
                @for (card of customDeckCards(); track $index) {
                  <div class="p-2 rounded-lg flex justify-between items-center"
                       [class.bg-slate-800]="ts.isDarkMode()">
                    <span class="font-bold">{{ card.front }}</span>
                    <span class="text-sm opacity-70">{{ card.back }}</span>
                    <button (click)="removeCardFromCustomDeck($index)"
                            class="p-1 text-red-400 hover:bg-red-900/50 rounded-full">&times;</button>
                  </div>
                } @empty {
                  <div class="text-center text-xs opacity-50 py-4">Belum ada kartu.</div>
                }
              </div>
            </section>
            <button (click)="view.set('add_cards')"
                    class="w-full py-3 font-bold rounded-xl border transition"
                    [class.bg-slate-800]="ts.isDarkMode()" [class.border-slate-700]="ts.isDarkMode()"
                    [class.bg-gray-100]="!ts.isDarkMode()" [class.border-gray-300]="!ts.isDarkMode()">
              {{ ts.get('flashcard.add_cards') }}
            </button>
            <div class="flex gap-3">
              <button (click)="startCustomSession()"
                      class="flex-1 py-4 bg-yellow-600 hover:bg-yellow-500 text-black font-bold rounded-xl transition"
                      [disabled]="customDeckCards().length === 0">
                {{ ts.get('flashcard.start_session') }}
              </button>
              <button (click)="saveDeck()"
                      class="flex-1 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition">
                {{ editingDeckId() ? ts.get('flashcard.update_deck') : ts.get('flashcard.save_deck') }}
              </button>
            </div>
          </div>
        }

        <!-- ══════════════════════════════════════
             ADD CARDS
             ══════════════════════════════════════ -->
        @if (view() === 'add_cards') {
          <div class="animate-in fade-in duration-300 space-y-4">
            <input type="text" [(ngModel)]="searchQuery" (input)="onSearch()"
                   [placeholder]="ts.get('flashcard.search_to_add')"
                   class="w-full p-3 rounded-lg border-2 sticky top-[73px] z-10"
                   [class.bg-slate-900]="ts.isDarkMode()" [class.border-slate-700]="ts.isDarkMode()"
                   [class.bg-white]="!ts.isDarkMode()" [class.border-gray-200]="!ts.isDarkMode()">

            <div class="space-y-2">
              <h3 class="text-sm font-bold opacity-70">{{ ts.get('flashcard.browse_by_deck') }}</h3>
              <div class="flex gap-2 overflow-x-auto pb-2">
                @for (dt of allDeckTypes; track dt) {
                  <button (click)="selectAddCardCategory(dt)"
                          class="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition"
                          [class.bg-yellow-900/40]="addCardCategory() === dt"
                          [class.text-yellow-200]="addCardCategory() === dt"
                          [class.border-yellow-700]="addCardCategory() === dt"
                          [class.bg-slate-900]="addCardCategory() !== dt && ts.isDarkMode()"
                          [class.text-slate-400]="addCardCategory() !== dt && ts.isDarkMode()"
                          [class.border-slate-800]="addCardCategory() !== dt && ts.isDarkMode()"
                          [class.bg-gray-100]="addCardCategory() !== dt && !ts.isDarkMode()"
                          [class.text-slate-600]="addCardCategory() !== dt && !ts.isDarkMode()"
                          [class.border-gray-300]="addCardCategory() !== dt && !ts.isDarkMode()">
                    {{ getDeckName(dt) }}
                  </button>
                }
              </div>
            </div>

            <div class="border-t pt-4" [class.border-slate-800]="ts.isDarkMode()">
              <div class="space-y-2 max-h-[60vh] overflow-y-auto">
                @for (item of displayList(); track $index) {
                  <div class="p-3 rounded-lg flex justify-between items-center"
                       [class.bg-slate-800]="ts.isDarkMode()" [class.bg-gray-100]="!ts.isDarkMode()">
                    <div>
                      <div class="font-bold text-lg">{{ item.front }}</div>
                      <div class="text-sm opacity-70">{{ item.back }} <span class="text-xs">{{ item.sub || '' }}</span></div>
                    </div>
                    @if (isCardAdded(item)) {
                      <button class="px-3 py-1.5 text-xs font-bold rounded-md bg-green-900/50 text-green-400 border border-green-800" disabled>
                        {{ ts.get('flashcard.added') }}
                      </button>
                    } @else {
                      <button (click)="addCardToCustomDeck(item)"
                              class="px-3 py-1.5 text-xs font-bold rounded-md bg-blue-600 text-white hover:bg-blue-500">
                        {{ ts.get('flashcard.add') }}
                      </button>
                    }
                  </div>
                } @empty {
                  <div class="text-center text-sm opacity-50 py-6 border-2 border-dashed rounded-xl"
                       [class.border-slate-800]="ts.isDarkMode()">
                    @if (searchQuery()) {
                      <span>Tidak ada hasil untuk "{{ searchQuery() }}".</span>
                    } @else {
                      <span>{{ ts.get('flashcard.select_category_prompt') }}</span>
                    }
                  </div>
                }
              </div>
            </div>
          </div>
        }

        <!-- ══════════════════════════════════════
             SESSION
             ══════════════════════════════════════ -->
        @if (view() === 'session' && currentCard()) {
          <div class="flex flex-col items-center animate-in fade-in duration-300">

            <!-- Counter row -->
            <div class="w-full max-w-sm flex justify-between items-center mb-3">
              <div class="text-sm font-medium opacity-70">
                {{ ts.get('flashcard.card') }} {{ currentIndex() + 1 }} {{ ts.get('flashcard.of') }} {{ deck().length }}
              </div>
              <!-- Manual full-TTS play button -->
              <button (click)="isSpeaking() ? stopSpeaking() : speakFull()"
                      class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition"
                      [class.bg-blue-900/40]="ts.isDarkMode()" [class.border-blue-700]="ts.isDarkMode()" [class.text-blue-300]="ts.isDarkMode()"
                      [class.bg-blue-50]="!ts.isDarkMode()" [class.border-blue-300]="!ts.isDarkMode()" [class.text-blue-700]="!ts.isDarkMode()">
                @if (isSpeaking()) {
                  <!-- Stop icon -->
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
                    <path d="M5.25 3A2.25 2.25 0 0 0 3 5.25v9.5A2.25 2.25 0 0 0 5.25 17h9.5A2.25 2.25 0 0 0 17 14.75v-9.5A2.25 2.25 0 0 0 14.75 3h-9.5Z"/>
                  </svg>
                  Stop
                } @else {
                  <!-- Play icon -->
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
                    <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.84Z"/>
                  </svg>
                  Putar TTS
                }
              </button>
            </div>

            <!-- ── Settings Panel (4 toggles) ── -->
            <div class="w-full max-w-sm mb-3 px-3 py-2.5 rounded-xl border flex flex-wrap gap-x-4 gap-y-2 items-center"
                 [class.bg-slate-900]="ts.isDarkMode()" [class.border-slate-800]="ts.isDarkMode()"
                 [class.bg-gray-100]="!ts.isDarkMode()" [class.border-gray-200]="!ts.isDarkMode()">

              <!-- Auto TTS -->
              <div class="flex items-center gap-1.5">
                <button class="mini-toggle" (click)="toggleAutoPlay()"
                        [class.bg-green-600]="autoPlay()"
                        [class.bg-gray-400]="!autoPlay() && !ts.isDarkMode()"
                        [class.bg-slate-700]="!autoPlay() && ts.isDarkMode()">
                  <div class="mini-thumb" [class.on]="autoPlay()" [class.off]="!autoPlay()"></div>
                </button>
                <span class="text-xs font-semibold opacity-75">Auto</span>
              </div>

              <span class="opacity-20 text-xs">|</span>

              <!-- Romaji -->
              <div class="flex items-center gap-1.5">
                <button class="mini-toggle" (click)="showRomaji.set(!showRomaji())"
                        [class.bg-blue-600]="showRomaji()"
                        [class.bg-gray-400]="!showRomaji() && !ts.isDarkMode()"
                        [class.bg-slate-700]="!showRomaji() && ts.isDarkMode()">
                  <div class="mini-thumb" [class.on]="showRomaji()" [class.off]="!showRomaji()"></div>
                </button>
                <span class="text-xs font-semibold opacity-75">Romaji</span>
              </div>

              <span class="opacity-20 text-xs">|</span>

              <!-- Hiragana -->
              <div class="flex items-center gap-1.5">
                <button class="mini-toggle" (click)="showHiragana.set(!showHiragana())"
                        [class.bg-purple-600]="showHiragana()"
                        [class.bg-gray-400]="!showHiragana() && !ts.isDarkMode()"
                        [class.bg-slate-700]="!showHiragana() && ts.isDarkMode()">
                  <div class="mini-thumb" [class.on]="showHiragana()" [class.off]="!showHiragana()"></div>
                </button>
                <span class="text-xs font-semibold opacity-75">仮名</span>
              </div>

              <span class="opacity-20 text-xs">|</span>

              <!-- Shuffle -->
              <div class="flex items-center gap-1.5">
                <button class="mini-toggle" (click)="shuffle.set(!shuffle())"
                        [class.bg-orange-500]="shuffle()"
                        [class.bg-gray-400]="!shuffle() && !ts.isDarkMode()"
                        [class.bg-slate-700]="!shuffle() && ts.isDarkMode()">
                  <div class="mini-thumb" [class.on]="shuffle()" [class.off]="!shuffle()"></div>
                </button>
                <span class="text-xs font-semibold opacity-75">Acak</span>
              </div>
            </div>

            <!-- Speaking indicator bar -->
            @if (isSpeaking()) {
              <div class="w-full max-w-sm mb-3 px-3 py-2 rounded-lg border flex items-center justify-between animate-in fade-in duration-200"
                   [class.bg-green-950/40]="ts.isDarkMode()" [class.border-green-800]="ts.isDarkMode()"
                   [class.bg-green-50]="!ts.isDarkMode()" [class.border-green-300]="!ts.isDarkMode()">
                <div class="flex items-center gap-2">
                  <!-- animated waveform bars -->
                  <div class="flex gap-0.5 items-end" style="height:1rem">
                    <span class="speaking-bar inline-block w-1 rounded-full" style="height:60%;animation-delay:0s"
                          [class.bg-green-400]="ts.isDarkMode()" [class.bg-green-500]="!ts.isDarkMode()"></span>
                    <span class="speaking-bar inline-block w-1 rounded-full" style="height:100%;animation-delay:0.15s"
                          [class.bg-green-400]="ts.isDarkMode()" [class.bg-green-500]="!ts.isDarkMode()"></span>
                    <span class="speaking-bar inline-block w-1 rounded-full" style="height:70%;animation-delay:0.3s"
                          [class.bg-green-400]="ts.isDarkMode()" [class.bg-green-500]="!ts.isDarkMode()"></span>
                    <span class="speaking-bar inline-block w-1 rounded-full" style="height:45%;animation-delay:0.1s"
                          [class.bg-green-400]="ts.isDarkMode()" [class.bg-green-500]="!ts.isDarkMode()"></span>
                    <span class="speaking-bar inline-block w-1 rounded-full" style="height:80%;animation-delay:0.25s"
                          [class.bg-green-400]="ts.isDarkMode()" [class.bg-green-500]="!ts.isDarkMode()"></span>
                  </div>
                  <span class="text-xs font-medium"
                        [class.text-green-400]="ts.isDarkMode()" [class.text-green-700]="!ts.isDarkMode()">
                    Memainkan audio TTS...
                  </span>
                </div>
                <button (click)="stopSpeaking()"
                        class="text-xs font-bold px-2 py-1 rounded transition"
                        [class.bg-green-900]="ts.isDarkMode()" [class.text-green-300]="ts.isDarkMode()"
                        [class.bg-green-200]="!ts.isDarkMode()" [class.text-green-800]="!ts.isDarkMode()">
                  Stop
                </button>
              </div>
            }

            <!-- ── Flashcard ── -->
            <div (click)="flipCard()"
                 class="card-container w-full max-w-sm cursor-pointer mb-5"
                 style="height:16rem"
                 [class.flipped]="isFlipped()">
              <div class="card-inner">

                <!-- FRONT -->
                <div class="card-front rounded-2xl border shadow-lg relative"
                     [class.bg-slate-900]="ts.isDarkMode()" [class.border-slate-700]="ts.isDarkMode()"
                     [class.bg-white]="!ts.isDarkMode()" [class.border-gray-200]="!ts.isDarkMode()">
                  <div class="text-6xl font-bold font-serif">{{ currentCard().front }}</div>

                  <!-- Hiragana/kana reading below kanji/vocab -->
                  @if (showHiragana() && currentCard().sub) {
                    <div class="text-xl mt-2 font-serif animate-in fade-in duration-200"
                         [class.text-purple-400]="ts.isDarkMode()" [class.text-purple-600]="!ts.isDarkMode()">
                      {{ currentCard().sub }}
                    </div>
                  }

                  <!-- Romaji -->
                  @if (showRomaji() && romajiForCurrentCard()) {
                    <div class="text-sm mt-1 opacity-60 font-mono animate-in fade-in duration-200">
                      {{ romajiForCurrentCard() }}
                    </div>
                  }

                  <!-- TTS front button -->
                  <button (click)="$event.stopPropagation(); tts.speak(currentCard().front, 'ja-JP')"
                          class="absolute top-2 right-2 p-2 rounded-full transition"
                          [class.hover:bg-slate-800]="ts.isDarkMode()" [class.text-blue-400]="ts.isDarkMode()"
                          [class.hover:bg-gray-100]="!ts.isDarkMode()" [class.text-blue-600]="!ts.isDarkMode()">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                      <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 2.485.519 4.952 1.848 6.595.342 1.241 1.519 1.905 2.66 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 1 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z"/>
                    </svg>
                  </button>
                </div>

                <!-- BACK -->
                <div class="card-back rounded-2xl border shadow-lg relative"
                     [class.bg-slate-800]="ts.isDarkMode()" [class.border-slate-600]="ts.isDarkMode()"
                     [class.bg-gray-100]="!ts.isDarkMode()" [class.border-gray-300]="!ts.isDarkMode()">
                  <div class="text-4xl font-bold">{{ currentCard().back }}</div>
                  @if (currentCard().sub) {
                    <div class="text-xl opacity-70 mt-2 font-mono">{{ currentCard().sub }}</div>
                    @if (showRomaji() && romajiForCurrentCard()) {
                      <div class="text-sm opacity-50 mt-1 font-mono animate-in fade-in duration-200">
                        ({{ romajiForCurrentCard() }})
                      </div>
                    }
                  }

                  <!-- TTS back button -->
                  <button (click)="$event.stopPropagation(); tts.speak(currentCard().back, 'id-ID')"
                          class="absolute top-2 right-2 p-2 rounded-full transition"
                          [class.hover:bg-slate-700]="ts.isDarkMode()" [class.text-yellow-400]="ts.isDarkMode()"
                          [class.hover:bg-gray-200]="!ts.isDarkMode()" [class.text-yellow-600]="!ts.isDarkMode()">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                      <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 2.485.519 4.952 1.848 6.595.342 1.241 1.519 1.905 2.66 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 1 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- ── Contoh Kalimat Panel ── -->
            @if (currentCard().example) {
              <div class="w-full max-w-sm mb-4 rounded-xl border overflow-hidden"
                   [class.bg-slate-900]="ts.isDarkMode()" [class.border-slate-700]="ts.isDarkMode()"
                   [class.bg-white]="!ts.isDarkMode()" [class.border-gray-200]="!ts.isDarkMode()">
                <!-- panel header -->
                <div class="flex items-center justify-between px-4 py-2.5 border-b"
                     [class.bg-slate-800]="ts.isDarkMode()" [class.border-slate-700]="ts.isDarkMode()"
                     [class.bg-amber-50]="!ts.isDarkMode()" [class.border-gray-200]="!ts.isDarkMode()">
                  <div class="flex items-center gap-2 text-xs font-bold"
                       [class.text-amber-400]="ts.isDarkMode()" [class.text-amber-700]="!ts.isDarkMode()">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                      <path fill-rule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 15.25Z" clip-rule="evenodd"/>
                    </svg>
                    Contoh Kalimat
                  </div>
                  <button (click)="speakExample()"
                          class="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border transition"
                          [class.bg-amber-900/40]="ts.isDarkMode()" [class.border-amber-700]="ts.isDarkMode()" [class.text-amber-300]="ts.isDarkMode()"
                          [class.bg-amber-100]="!ts.isDarkMode()" [class.border-amber-300]="!ts.isDarkMode()" [class.text-amber-700]="!ts.isDarkMode()">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
                      <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.84Z"/>
                    </svg>
                    🔊 Putar
                  </button>
                </div>
                <!-- panel body -->
                <div class="px-4 py-3 space-y-1">
                  <p class="text-base font-semibold leading-relaxed"
                     [class.text-slate-100]="ts.isDarkMode()" [class.text-slate-800]="!ts.isDarkMode()">
                    {{ currentCard().example }}
                  </p>
                  @if (currentCard().exampleMeaning) {
                    <p class="text-sm italic opacity-65">{{ currentCard().exampleMeaning }}</p>
                  }
                </div>
              </div>
            }

            <!-- ── Nav buttons ── -->
            <div class="w-full max-w-sm space-y-4">
              <div class="flex gap-3">
                <button (click)="prevCard()"
                        class="flex-1 py-3 rounded-xl border font-bold transition-colors"
                        [class.bg-slate-800]="ts.isDarkMode()" [class.border-slate-700]="ts.isDarkMode()" [class.hover:bg-slate-700]="ts.isDarkMode()"
                        [class.bg-white]="!ts.isDarkMode()" [class.border-gray-200]="!ts.isDarkMode()" [class.hover:bg-gray-100]="!ts.isDarkMode()">
                  ← {{ ts.get('flashcard.previous') }}
                </button>
                <button (click)="nextCard()"
                        class="flex-1 py-3 rounded-xl border font-bold transition-colors"
                        [class.bg-slate-800]="ts.isDarkMode()" [class.border-slate-700]="ts.isDarkMode()" [class.hover:bg-slate-700]="ts.isDarkMode()"
                        [class.bg-white]="!ts.isDarkMode()" [class.border-gray-200]="!ts.isDarkMode()" [class.hover:bg-gray-100]="!ts.isDarkMode()">
                  {{ ts.get('flashcard.next') }} →
                </button>
              </div>

              <!-- ── Drawing Canvas Panel ── -->
              <div class="w-full flex flex-col items-center p-3 rounded-xl border"
                   [class.bg-slate-900]="ts.isDarkMode()" [class.border-slate-800]="ts.isDarkMode()"
                   [class.bg-gray-100]="!ts.isDarkMode()" [class.border-gray-200]="!ts.isDarkMode()">

                <div class="w-full flex flex-wrap justify-between items-center mb-3 gap-2">
                  <div class="flex items-center gap-2">
                    <span class="text-sm font-medium opacity-70">Ukuran Papan:</span>
                    <select [ngModel]="canvasSizeOption()" (ngModelChange)="canvasSizeOption.set($event)"
                            class="text-xs p-1.5 rounded border bg-transparent focus:outline-none"
                            [class.border-slate-700]="ts.isDarkMode()" [class.border-gray-300]="!ts.isDarkMode()">
                      <option value="sm" class="text-black">Kecil (300x200)</option>
                      <option value="md" class="text-black">Sedang (400x300)</option>
                      <option value="lg" class="text-black">Besar (500x400)</option>
                      <option value="custom" class="text-black">Kustom</option>
                    </select>
                  </div>
                  <button (click)="clearCanvas()"
                          class="text-xs px-3 py-1.5 rounded-lg font-bold transition"
                          [class.bg-red-600/20]="ts.isDarkMode()" [class.text-red-400]="ts.isDarkMode()"
                          [class.bg-red-100]="!ts.isDarkMode()" [class.text-red-600]="!ts.isDarkMode()">
                    Hapus Papan
                  </button>
                </div>

                @if (canvasSizeOption() === 'custom') {
                  <div class="w-full flex justify-start items-center gap-2 mb-3 animate-in fade-in">
                    <label class="text-xs opacity-70">Lebar:</label>
                    <input type="number" [(ngModel)]="customCanvasWidth"
                           class="w-16 text-xs p-1 rounded border bg-transparent text-center focus:outline-none"
                           [class.border-slate-700]="ts.isDarkMode()" [class.border-gray-300]="!ts.isDarkMode()">
                    <span class="text-xs opacity-70">x</span>
                    <label class="text-xs opacity-70">Tinggi:</label>
                    <input type="number" [(ngModel)]="customCanvasHeight"
                           class="w-16 text-xs p-1 rounded border bg-transparent text-center focus:outline-none"
                           [class.border-slate-700]="ts.isDarkMode()" [class.border-gray-300]="!ts.isDarkMode()">
                  </div>
                }

                <div class="w-full flex justify-center overflow-auto rounded-lg shadow-inner bg-white border"
                     [class.border-gray-300]="!ts.isDarkMode()" [class.border-slate-700]="ts.isDarkMode()">
                  <canvas #drawingCanvas
                          [width]="canvasWidth()"
                          [height]="canvasHeight()"
                          style="display:block"
                          class="touch-none cursor-crosshair max-w-full"
                          (mousedown)="startDrawing($event)"
                          (mousemove)="draw($event)"
                          (mouseup)="stopDrawing()"
                          (mouseout)="stopDrawing()"
                          (touchstart)="startDrawing($event)"
                          (touchmove)="draw($event)"
                          (touchend)="stopDrawing()">
                  </canvas>
                </div>
              </div>

              <button (click)="backToMenu()"
                      class="w-full py-3 rounded-xl font-bold transition-colors opacity-70 hover:opacity-100"
                      [class.text-slate-400]="ts.isDarkMode()" [class.text-slate-500]="!ts.isDarkMode()">
                {{ ts.get('flashcard.back_to_menu') }}
              </button>
            </div>
          </div>
        }

      </div><!-- /p-4 -->

      <!-- ══════════════════════════════════════
           DELETE MODAL
           ══════════════════════════════════════ -->
      @if (deckToDelete()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" (click)="deckToDelete.set(null)"></div>
          <div class="relative border rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-in fade-in zoom-in duration-200"
               [class.bg-slate-900]="ts.isDarkMode()" [class.border-slate-800]="ts.isDarkMode()"
               [class.bg-white]="!ts.isDarkMode()" [class.border-gray-200]="!ts.isDarkMode()">
            <div class="text-center">
              <div class="mb-4 text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     stroke-width="1.5" stroke="currentColor" class="w-12 h-12 mx-auto">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.067-2.09 1.02-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                </svg>
              </div>
              <h3 class="text-lg font-bold mb-2">{{ deleteModalTitle() }}</h3>
              <p class="text-sm mb-6"
                 [class.text-slate-400]="ts.isDarkMode()" [class.text-slate-500]="!ts.isDarkMode()">
                {{ ts.get('flashcard.delete_confirm').replace('{deckName}', deckToDelete()!.name) }}
              </p>
              <div class="flex gap-3">
                <button (click)="deckToDelete.set(null)"
                        class="flex-1 py-3 font-bold rounded-xl border transition"
                        [class.bg-slate-800]="ts.isDarkMode()" [class.text-slate-300]="ts.isDarkMode()"
                        [class.border-slate-700]="ts.isDarkMode()" [class.hover:bg-slate-700]="ts.isDarkMode()"
                        [class.bg-gray-100]="!ts.isDarkMode()" [class.border-gray-300]="!ts.isDarkMode()">
                  {{ ts.get('common.back') }}
                </button>
                <button (click)="confirmDelete()"
                        class="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-500 transition shadow-lg shadow-red-900/30">
                  {{ ts.get('flashcard.delete') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      }

    </div><!-- /min-h-screen -->
  `
})
export class FlashcardComponent implements OnInit {

  // ── DI ──────────────────────────────────────────────────────────────────────
  ts               = inject(TranslationService);
  dataService      = inject(JapaneseDataService);
  tts              = inject(TtsService);
  router           = inject(Router);
  kanaToRomajiPipe = inject(KanaToRomajiPipe);

  // ── View & Deck State ───────────────────────────────────────────────────────
  view         = signal<'menu' | 'session' | 'config' | 'add_cards'>('menu');
  deck         = signal<FlashcardItem[]>([]);
  currentIndex = signal(0);
  isFlipped    = signal(false);
  shuffle      = signal(true);

  // ── Display Toggles ─────────────────────────────────────────────────────────
  showRomaji   = signal(false);
  showHiragana = signal(false);

  // ── TTS State ───────────────────────────────────────────────────────────────
  autoPlay   = signal(false);
  isSpeaking = signal(false);
  /** Shared cancellation object; replaced on every new chain. */
  private cancelRef = { cancelled: false };

  // ── Canvas ──────────────────────────────────────────────────────────────────
  private isDrawingOnCanvas = false;
  canvasRef?: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D | null = null;

  canvasSizeOption   = signal<'sm' | 'md' | 'lg' | 'custom'>('sm');
  customCanvasWidth  = signal(300);
  customCanvasHeight = signal(200);

  canvasWidth = computed(() => {
    switch (this.canvasSizeOption()) {
      case 'sm': return 300; case 'md': return 400; case 'lg': return 500;
      case 'custom': return this.customCanvasWidth() || 300; default: return 300;
    }
  });
  canvasHeight = computed(() => {
    switch (this.canvasSizeOption()) {
      case 'sm': return 200; case 'md': return 300; case 'lg': return 400;
      case 'custom': return this.customCanvasHeight() || 200; default: return 200;
    }
  });

  @ViewChild('drawingCanvas') set canvasSetup(el: ElementRef<HTMLCanvasElement>) {
    if (el) { this.canvasRef = el; this.ctx = el.nativeElement.getContext('2d'); }
    else    { this.canvasRef = undefined; this.ctx = null; }
  }

  // ── Custom Deck ─────────────────────────────────────────────────────────────
  customDeckName  = signal('');
  customDeckCards = signal<FlashcardItem[]>([]);
  savedDecks      = signal<SavedDeck[]>([]);
  editingDeckId   = signal<number | null>(null);
  deckToDelete    = signal<SavedDeck | null>(null);

  // ── Add-cards view ──────────────────────────────────────────────────────────
  searchQuery     = signal('');
  searchResults   = signal<FlashcardItem[]>([]);
  addCardCategory = signal<DeckType | null>(null);

  // ── Static lists ────────────────────────────────────────────────────────────
  readonly allDeckTypes: DeckType[] = [
    'HIRAGANA','KATAKANA',
    'KANJI_N5','KANJI_N4','KANJI_N3','KANJI_N2','KANJI_N1',
    'VOCAB_N5','VOCAB_N4','VOCAB_N3','VOCAB_N2','VOCAB_N1',
  ];

  readonly predefinedDecks: { type: DeckType; char: string; color: string }[] = [
    { type: 'HIRAGANA', char: 'あ', color: 'text-rose-400'  },
    { type: 'KATAKANA', char: 'ア', color: 'text-rose-400'  },
    { type: 'KANJI_N5', char: '字', color: 'text-blue-400'  },
    { type: 'KANJI_N4', char: '語', color: 'text-blue-500'  },
    { type: 'KANJI_N3', char: '漢', color: 'text-blue-500'  },
    { type: 'KANJI_N2', char: '難', color: 'text-blue-600'  },
    { type: 'KANJI_N1', char: '極', color: 'text-blue-700'  },
    { type: 'VOCAB_N5', char: '本', color: 'text-cyan-400'  },
    { type: 'VOCAB_N4', char: '味', color: 'text-cyan-500'  },
    { type: 'VOCAB_N3', char: '心', color: 'text-cyan-500'  },
    { type: 'VOCAB_N2', char: '力', color: 'text-cyan-600'  },
    { type: 'VOCAB_N1', char: '道', color: 'text-cyan-700'  },
  ];

  // ── Computed ─────────────────────────────────────────────────────────────────
  currentCard = computed(() => this.deck()[this.currentIndex()]);

  romajiForCurrentCard = computed(() => {
    const card = this.currentCard();
    return card?.sub ? this.kanaToRomajiPipe.transform(card.sub) : '';
  });

  headerTitle = computed(() => {
    switch (this.view()) {
      case 'config':    return this.ts.get('flashcard.config_title');
      case 'add_cards': return this.ts.get('flashcard.add_cards');
      default:          return this.ts.get('flashcard.title');
    }
  });

  deleteModalTitle = computed(() =>
    this.ts.currentLang() === 'ID' ? 'Hapus Dek' : 'Delete Deck'
  );

  categoryItems = computed<FlashcardItem[]>(() => {
    const cat = this.addCardCategory();
    if (!cat) return [];
    return this.getRawData(cat).map(i => this.formatCard(i)).filter(Boolean) as FlashcardItem[];
  });

  displayList = computed<FlashcardItem[]>(() =>
    this.searchQuery() ? this.searchResults() : this.categoryItems()
  );

  // ── Constructor ──────────────────────────────────────────────────────────────
  constructor() {
    // Auto-play: re-runs when autoPlay signal or currentIndex changes
    effect(() => {
      const on       = this.autoPlay();
      const _index   = this.currentIndex(); // reactive dependency
      const inSession = this.view() === 'session';
      if (on && inSession) {
        setTimeout(() => this.speakFull(), 450);
      }
    });
  }

  // ── Lifecycle ─────────────────────────────────────────────────────────────────
  ngOnInit(): void { this.loadDecks(); }

  // ── Navigation ────────────────────────────────────────────────────────────────
  goBack(): void {
    this.stopSpeaking();
    if (this.view() === 'session')      { this.view.set('menu'); }
    else if (this.view() === 'config')  { this.resetBuilder(); this.view.set('menu'); }
    else if (this.view() === 'add_cards') { this.view.set('config'); }
    else { this.router.navigate(['/']); }
  }

  // ── Deck Persistence ──────────────────────────────────────────────────────────
  loadDecks(): void {
    const raw = localStorage.getItem('customFlashcardDecks');
    if (raw) { this.savedDecks.set(JSON.parse(raw)); }
  }

  saveDeck(): void {
    const name  = this.customDeckName().trim();
    const cards = this.customDeckCards();
    if (!name || cards.length === 0) { alert('Nama dek dan kartu tidak boleh kosong.'); return; }
    const id = this.editingDeckId();
    if (id !== null) {
      this.savedDecks.update(ds => ds.map(d => d.id === id ? { ...d, name, cards } : d));
    } else {
      this.savedDecks.update(ds => [...ds, { id: Date.now(), name, cards }]);
    }
    localStorage.setItem('customFlashcardDecks', JSON.stringify(this.savedDecks()));
    this.resetBuilder();
    this.view.set('menu');
  }

  deleteDeck(deck: SavedDeck): void { this.deckToDelete.set(deck); }

  confirmDelete(): void {
    const t = this.deckToDelete();
    if (!t) return;
    this.savedDecks.update(ds => ds.filter(d => d.id !== t.id));
    localStorage.setItem('customFlashcardDecks', JSON.stringify(this.savedDecks()));
    this.deckToDelete.set(null);
  }

  editDeck(deck: SavedDeck): void {
    this.editingDeckId.set(deck.id);
    this.customDeckName.set(deck.name);
    this.customDeckCards.set([...deck.cards]);
    this.view.set('config');
  }

  private resetBuilder(): void {
    this.editingDeckId.set(null);
    this.customDeckName.set('');
    this.customDeckCards.set([]);
  }

  // ── Session ───────────────────────────────────────────────────────────────────
  startSession(type: DeckType): void {
    this.startDeck(this.getRawData(type).map(i => this.formatCard(i)).filter(Boolean) as FlashcardItem[]);
  }
  startSavedDeckSession(deck: SavedDeck): void { this.startDeck(deck.cards); }
  startCustomSession(): void                   { this.startDeck(this.customDeckCards()); }
  startBuildingNewDeck(): void { this.resetBuilder(); this.view.set('config'); }

  startDeck(cards: FlashcardItem[]): void {
    this.stopSpeaking();
    this.deck.set(this.shuffle() ? this.shuffled(cards) : cards);
    this.currentIndex.set(0);
    this.isFlipped.set(false);
    this.view.set('session');
  }

  // ── Card Nav ──────────────────────────────────────────────────────────────────
  flipCard(): void { this.isFlipped.update(v => !v); }

  nextCard(): void {
    this.stopSpeaking(); this.isFlipped.set(false); this.clearCanvas();
    setTimeout(() => this.currentIndex.update(i => (i + 1) % this.deck().length), 150);
  }

  prevCard(): void {
    this.stopSpeaking(); this.isFlipped.set(false); this.clearCanvas();
    setTimeout(() => this.currentIndex.update(i => (i - 1 + this.deck().length) % this.deck().length), 150);
  }

  backToMenu(): void { this.stopSpeaking(); this.view.set('menu'); this.deck.set([]); }

  // ── Add-cards helpers ─────────────────────────────────────────────────────────
  selectAddCardCategory(cat: DeckType | null): void {
    this.searchQuery.set(''); this.searchResults.set([]); this.addCardCategory.set(cat);
  }

  onSearch(): void {
    this.addCardCategory.set(null);
    const q = this.searchQuery().toLowerCase().trim();
    if (q.length < 1) { this.searchResults.set([]); return; }
    const all: (Kana | Kanji | Vocab)[] = [
      ...this.dataService.getKana('HIRAGANA','GOJUUON'),
      ...this.dataService.getKana('KATAKANA','GOJUUON'),
      ...this.dataService.getKanji('ALL'),
      ...this.dataService.getVocab('ALL'),
    ];
    const hits = all.filter(item => {
      if ('romaji' in item) return item.char.includes(q) || item.romaji.includes(q);
      if ('onyomi' in item) return item.char.includes(q) || item.meaning.toLowerCase().includes(q)
                                || item.onyomi.join(',').includes(q) || item.kunyomi.join(',').includes(q);
      if ('word'   in item) return item.word.includes(q) || item.kana.includes(q)
                                || item.meaning.toLowerCase().includes(q);
      return false;
    });
    this.searchResults.set(
      (hits.map(i => this.formatCard(i)).filter(Boolean) as FlashcardItem[]).slice(0, 50)
    );
  }

  addCardToCustomDeck(card: FlashcardItem): void {
    this.customDeckCards.update(cs => [...cs, card]);
  }
  removeCardFromCustomDeck(idx: number): void {
    this.customDeckCards.update(cs => cs.filter((_, i) => i !== idx));
  }
  isCardAdded(card: FlashcardItem): boolean {
    return this.customDeckCards().some(c => c.front === card.front && c.back === card.back);
  }

  // ── Formatting ────────────────────────────────────────────────────────────────
  formatCard(item: Kana | Kanji | Vocab): FlashcardItem | null {
    if ('romaji' in item) {
      return { front: item.char, back: (item as Kana).romaji };
    }
    if ('onyomi' in item) {
      const k = item as Kanji;
      return { front: k.char, back: k.meaning,
               sub: `${k.onyomi.join(', ')} / ${k.kunyomi.join(', ')}`,
               example: (k as any).example, exampleMeaning: (k as any).exampleMeaning };
    }
    if ('word' in item) {
      const v = item as Vocab;
      return { front: v.word, back: v.meaning, sub: v.kana,
               example: (v as any).example, exampleMeaning: (v as any).exampleMeaning };
    }
    return null;
  }

  private getRawData(type: DeckType): (Kana | Kanji | Vocab)[] {
    switch (type) {
      case 'HIRAGANA': return this.dataService.getKana('HIRAGANA','GOJUUON');
      case 'KATAKANA': return this.dataService.getKana('KATAKANA','GOJUUON');
      case 'KANJI_N5': return this.dataService.getKanji('N5');
      case 'KANJI_N4': return this.dataService.getKanji('N4');
      case 'KANJI_N3': return this.dataService.getKanji('N3');
      case 'KANJI_N2': return this.dataService.getKanji('N2');
      case 'KANJI_N1': return this.dataService.getKanji('N1');
      case 'VOCAB_N5': return this.dataService.getVocab('N5');
      case 'VOCAB_N4': return this.dataService.getVocab('N4');
      case 'VOCAB_N3': return this.dataService.getVocab('N3');
      case 'VOCAB_N2': return this.dataService.getVocab('N2');
      case 'VOCAB_N1': return this.dataService.getVocab('N1');
      default:         return [];
    }
  }

  getDeckName(type: DeckType): string {
    const k = this.ts.get('flashcard.kanji_deck');
    const v = this.ts.get('flashcard.vocab_deck');
    switch (type) {
      case 'HIRAGANA': return this.ts.get('flashcard.hiragana_deck');
      case 'KATAKANA': return this.ts.get('flashcard.katakana_deck');
      case 'KANJI_N5': return `${k} N5`; case 'KANJI_N4': return `${k} N4`;
      case 'KANJI_N3': return `${k} N3`; case 'KANJI_N2': return `${k} N2`; case 'KANJI_N1': return `${k} N1`;
      case 'VOCAB_N5': return `${v} N5`; case 'VOCAB_N4': return `${v} N4`;
      case 'VOCAB_N3': return `${v} N3`; case 'VOCAB_N2': return `${v} N2`; case 'VOCAB_N1': return `${v} N1`;
      default: return '';
    }
  }

  // ── TTS ────────────────────────────────────────────────────────────────────────
  toggleAutoPlay(): void {
    const next = !this.autoPlay();
    this.autoPlay.set(next);
    if (!next) this.stopSpeaking();
  }

  stopSpeaking(): void {
    this.cancelRef = { cancelled: true };   // invalidate any running chain
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking.set(false);
  }

  /**
   * Full TTS sequence:
   * 1. 🇯🇵 kata Jepang (rate 0.9)
   * 2. ⏸ jeda
   * 3. 🇮🇩 arti Indonesia (rate 1.0)
   * 4. ⏸ jeda
   * 5. 🇯🇵 contoh kalimat penuh (rate 0.85)
   * 6. ⏸ jeda
   * 7. 🇯🇵 spell per kata/karakter (rate 0.45)
   * 8. ⏸ jeda
   * 9. 🇮🇩 arti contoh kalimat (rate 1.0)
   */
  speakFull(): void {
    const card = this.currentCard();
    if (!card) return;
    this.stopSpeaking();

    const ref = { cancelled: false };
    this.cancelRef = ref;
    this.isSpeaking.set(true);

    const utts: SpeechSynthesisUtterance[] = [];
    const u = (text: string, lang: string, rate = 1.0) => {
      const uu = new SpeechSynthesisUtterance(text);
      uu.lang = lang; uu.rate = rate;
      return uu;
    };

    utts.push(u(card.front, 'ja-JP', 0.9));
    utts.push(u(card.back,  'id-ID', 1.0));

    if (card.example) {
      utts.push(u(card.example, 'ja-JP', 0.85));
      for (const p of this.splitJP(card.example)) {
        utts.push(u(p, 'ja-JP', 0.45));
      }
      if (card.exampleMeaning) {
        utts.push(u(card.exampleMeaning, 'id-ID', 1.0));
      }
    }

    this.runChain(utts, ref, 650);
  }

  /** Play only the example-sentence sequence */
  speakExample(): void {
    const card = this.currentCard();
    if (!card?.example) return;
    this.stopSpeaking();

    const ref = { cancelled: false };
    this.cancelRef = ref;
    this.isSpeaking.set(true);

    const utts: SpeechSynthesisUtterance[] = [];
    const u = (text: string, lang: string, rate = 1.0) => {
      const uu = new SpeechSynthesisUtterance(text);
      uu.lang = lang; uu.rate = rate;
      return uu;
    };

    utts.push(u(card.example, 'ja-JP', 0.85));
    for (const p of this.splitJP(card.example)) {
      utts.push(u(p, 'ja-JP', 0.45));
    }
    if (card.exampleMeaning) {
      utts.push(u(card.exampleMeaning, 'id-ID', 1.0));
    }

    this.runChain(utts, ref, 650);
  }

  private runChain(
    utts: SpeechSynthesisUtterance[],
    ref: { cancelled: boolean },
    pauseMs: number
  ): void {
    const next = (i: number) => {
      if (ref.cancelled || i >= utts.length) { this.isSpeaking.set(false); return; }
      const u = utts[i];
      u.onend   = () => { if (!ref.cancelled) { setTimeout(() => next(i + 1), pauseMs); } else { this.isSpeaking.set(false); } };
      u.onerror = () => { this.isSpeaking.set(false); };
      window.speechSynthesis.speak(u);
    };
    next(0);
  }

  /**
   * Split Japanese text for slow spelling.
   * Space-separated → split on spaces.
   * Otherwise → split per character, keeping only Japanese script glyphs.
   */
  private splitJP(text: string): string[] {
    if (text.includes(' ')) return text.split(' ').filter(Boolean);
    return [...text].filter(ch =>
      /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\uFF00-\uFFEF]/.test(ch)
    );
  }

  // ── Shuffle ────────────────────────────────────────────────────────────────────
  private shuffled<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ── Canvas Drawing ─────────────────────────────────────────────────────────────
  startDrawing(e: MouseEvent | TouchEvent): void {
    if (!this.ctx) return;
    this.ctx.lineWidth = 4; this.ctx.lineCap = 'round';
    this.ctx.lineJoin  = 'round'; this.ctx.strokeStyle = '#000000';
    this.isDrawingOnCanvas = true;
    this.draw(e);
  }

  draw(e: MouseEvent | TouchEvent): void {
    if (!this.isDrawingOnCanvas || !this.ctx || !this.canvasRef) return;
    if (e.cancelable) e.preventDefault();
    const canvas = this.canvasRef.nativeElement;
    const rect   = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
    const x = (clientX - rect.left) * (canvas.width  / rect.width);
    const y = (clientY - rect.top)  * (canvas.height / rect.height);
    this.ctx.lineTo(x, y); this.ctx.stroke();
    this.ctx.beginPath(); this.ctx.moveTo(x, y);
  }

  stopDrawing(): void {
    this.isDrawingOnCanvas = false;
    if (this.ctx) this.ctx.beginPath();
  }

  clearCanvas(): void {
    if (this.ctx && this.canvasRef) {
      const c = this.canvasRef.nativeElement;
      this.ctx.clearRect(0, 0, c.width, c.height);
      this.ctx.beginPath();
    }
  }
}
