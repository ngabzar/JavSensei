import { Injectable } from '@angular/core';
import { writing_component_1 } from '../components/writing.component_1';
import { writing_component_2 } from '../components/writing.component_2';
import { writing_component_3 } from '../components/writing.component_3';
import { writing_component_4 } from '../components/writing.component_4';
import { writing_component_5 } from '../components/writing.component_5';
import { writing_component_6 } from '../components/writing.component_6';
import { writing_component_7 } from '../components/writing.component_7';
import { writing_component_8 } from '../components/writing.component_8';
import { writing_component_9 } from '../components/writing.component_9';
import { writing_component_10 } from '../components/writing.component_10';
import { writing_component_11 } from '../components/writing.component_11';
import { writing_component_12 } from '../components/writing.component_12';
import { writing_component_13 } from '../components/writing.component_13';
import { writing_component_14 } from '../components/writing.component_14';
import { writing_component_15 } from '../components/writing.component_15';
import { writing_component_16 } from '../components/writing.component_16';
import { writing_component_17 } from '../components/writing.component_17';
import { writing_component_18 } from '../components/writing.component_18';
import { writing_component_19 } from '../components/writing.component_19';
import { writing_component_20 } from '../components/writing.component_20';

@Injectable({
  providedIn: 'root'
})
export class WritingDataService {
  
  // Menggabungkan semua database menjadi satu akses
  private vectorDatabase: Record<string, string> = {
    ...writing_component_1,
    ...writing_component_2,
    ...writing_component_3,
    ...writing_component_4,
    ...writing_component_5,
    ...writing_component_6,
    ...writing_component_7,
    ...writing_component_8,
    ...writing_component_9,
    ...writing_component_10,
    ...writing_component_11,
    ...writing_component_12,
    ...writing_component_13,
    ...writing_component_14,
    ...writing_component_15,
    ...writing_component_16,
    ...writing_component_17,
    ...writing_component_18,
    ...writing_component_19,
    ...writing_component_20,
  };

  constructor() {}

  /**
   * Mengambil data SVG berdasarkan karakter.
   * Mengembalikan undefined jika tidak ditemukan di database lokal.
   */
  getVector(char: string): string | undefined {
    return this.vectorDatabase[char];
  }

  /**
   * Cek apakah karakter ada di database lokal
   */
  hasVector(char: string): boolean {
    return !!this.vectorDatabase[char];
  }
}
