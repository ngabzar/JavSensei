import { Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { KanaComponent } from './components/kana.component';
import { KanjiComponent } from './components/kanji.component';
import { BunpouComponent } from './components/bunpou.component';
import { ParticlesComponent } from './components/particles.component';
import { WritingComponent } from './components/writing.component';
import { VocabComponent } from './components/vocab.component';
import { QuizComponent } from './components/quiz.component';
import { SettingsComponent } from './components/settings.component';
import { FlashcardComponent } from './components/flashcard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'kana', component: KanaComponent },
  { path: 'kanji', component: KanjiComponent },
  { path: 'bunpou', component: BunpouComponent },
  { path: 'particles', component: ParticlesComponent },
  { path: 'writing', component: WritingComponent },
  { path: 'vocab', component: VocabComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'flashcard', component: FlashcardComponent },
  { path: '**', redirectTo: '' }
];