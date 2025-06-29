export class SequenceAlignment {
  static MATCH = 2;
  static MISMATCH = -1;
  static GAP = -1;

  static needlemanWunsch(seq1, seq2) {
    const m = seq1.length;
    const n = seq2.length;
    
    // Initialize scoring matrix
    const score = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    
    // Initialize first row and column
    for (let i = 0; i <= m; i++) score[i][0] = i * this.GAP;
    for (let j = 0; j <= n; j++) score[0][j] = j * this.GAP;
    
    // Fill scoring matrix
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const match = score[i-1][j-1] + (seq1[i-1] === seq2[j-1] ? this.MATCH : this.MISMATCH);
        const delete_ = score[i-1][j] + this.GAP;
        const insert = score[i][j-1] + this.GAP;
        
        score[i][j] = Math.max(match, delete_, insert);
      }
    }
    
    // Traceback
    const alignment = this.traceback(seq1, seq2, score, m, n);
    
    return {
      sequence1: seq1,
      sequence2: seq2,
      aligned1: alignment.aligned1,
      aligned2: alignment.aligned2,
      score: score[m][n],
      identity: this.calculateIdentity(alignment.aligned1, alignment.aligned2),
      gaps: this.countGaps(alignment.aligned1, alignment.aligned2),
      algorithm: 'needleman-wunsch'
    };
  }

  static smithWaterman(seq1, seq2) {
    const m = seq1.length;
    const n = seq2.length;
    
    // Initialize scoring matrix
    const score = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    let maxScore = 0;
    let maxI = 0, maxJ = 0;
    
    // Fill scoring matrix
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const match = score[i-1][j-1] + (seq1[i-1] === seq2[j-1] ? this.MATCH : this.MISMATCH);
        const delete_ = score[i-1][j] + this.GAP;
        const insert = score[i][j-1] + this.GAP;
        
        score[i][j] = Math.max(0, match, delete_, insert);
        
        if (score[i][j] > maxScore) {
          maxScore = score[i][j];
          maxI = i;
          maxJ = j;
        }
      }
    }
    
    // Traceback from maximum score
    const alignment = this.tracebackLocal(seq1, seq2, score, maxI, maxJ);
    
    return {
      sequence1: seq1,
      sequence2: seq2,
      aligned1: alignment.aligned1,
      aligned2: alignment.aligned2,
      score: maxScore,
      identity: this.calculateIdentity(alignment.aligned1, alignment.aligned2),
      gaps: this.countGaps(alignment.aligned1, alignment.aligned2),
      algorithm: 'smith-waterman'
    };
  }

  static traceback(seq1, seq2, score, i, j) {
    let aligned1 = '';
    let aligned2 = '';
    
    while (i > 0 && j > 0) {
      const current = score[i][j];
      const diagonal = score[i-1][j-1];
      const up = score[i-1][j];
      const left = score[i][j-1];
      
      if (current === diagonal + (seq1[i-1] === seq2[j-1] ? this.MATCH : this.MISMATCH)) {
        aligned1 = seq1[i-1] + aligned1;
        aligned2 = seq2[j-1] + aligned2;
        i--; j--;
      } else if (current === up + this.GAP) {
        aligned1 = seq1[i-1] + aligned1;
        aligned2 = '-' + aligned2;
        i--;
      } else {
        aligned1 = '-' + aligned1;
        aligned2 = seq2[j-1] + aligned2;
        j--;
      }
    }
    
    // Add remaining characters
    while (i > 0) {
      aligned1 = seq1[i-1] + aligned1;
      aligned2 = '-' + aligned2;
      i--;
    }
    while (j > 0) {
      aligned1 = '-' + aligned1;
      aligned2 = seq2[j-1] + aligned2;
      j--;
    }
    
    return { aligned1, aligned2 };
  }

  static tracebackLocal(seq1, seq2, score, startI, startJ) {
    let aligned1 = '';
    let aligned2 = '';
    let i = startI, j = startJ;
    
    while (i > 0 && j > 0 && score[i][j] > 0) {
      const current = score[i][j];
      const diagonal = score[i-1][j-1];
      const up = score[i-1][j];
      const left = score[i][j-1];
      
      if (current === diagonal + (seq1[i-1] === seq2[j-1] ? this.MATCH : this.MISMATCH)) {
        aligned1 = seq1[i-1] + aligned1;
        aligned2 = seq2[j-1] + aligned2;
        i--; j--;
      } else if (current === up + this.GAP) {
        aligned1 = seq1[i-1] + aligned1;
        aligned2 = '-' + aligned2;
        i--;
      } else {
        aligned1 = '-' + aligned1;
        aligned2 = seq2[j-1] + aligned2;
        j--;
      }
    }
    
    return { aligned1, aligned2 };
  }

  static calculateIdentity(aligned1, aligned2) {
    let matches = 0;
    let validPositions = 0;
    
    for (let i = 0; i < aligned1.length; i++) {
      if (aligned1[i] !== '-' && aligned2[i] !== '-') {
        validPositions++;
        if (aligned1[i] === aligned2[i]) {
          matches++;
        }
      }
    }
    
    return validPositions > 0 ? (matches / validPositions) * 100 : 0;
  }

  static countGaps(aligned1, aligned2) {
    let gaps = 0;
    for (let i = 0; i < aligned1.length; i++) {
      if (aligned1[i] === '-' || aligned2[i] === '-') {
        gaps++;
      }
    }
    return gaps;
  }
}