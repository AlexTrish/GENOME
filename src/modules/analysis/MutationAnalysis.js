export class MutationAnalysis {
  static analyzeVariants(vcfRecords) {
    const stats = {
      totalVariants: vcfRecords.length,
      snps: 0,
      indels: 0,
      transitions: 0,
      transversions: 0,
      tiTvRatio: 0,
      chromosomeDistribution: {},
      qualityStats: { mean: 0, median: 0, min: 0, max: 0 }
    };

    if (vcfRecords.length === 0) return stats;

    const qualities = [];
    
    vcfRecords.forEach(record => {
      // Count by chromosome
      stats.chromosomeDistribution[record.chrom] = 
        (stats.chromosomeDistribution[record.chrom] || 0) + 1;
      
      // Collect quality scores
      if (record.qual > 0) {
        qualities.push(record.qual);
      }
      
      // Classify variant type
      if (record.ref.length === 1 && record.alt.length === 1) {
        stats.snps++;
        
        // Classify transition/transversion
        if (this.isTransition(record.ref, record.alt)) {
          stats.transitions++;
        } else {
          stats.transversions++;
        }
      } else {
        stats.indels++;
      }
    });

    // Calculate Ti/Tv ratio
    stats.tiTvRatio = stats.transversions > 0 ? stats.transitions / stats.transversions : 0;

    // Calculate quality statistics
    if (qualities.length > 0) {
      qualities.sort((a, b) => a - b);
      stats.qualityStats.min = qualities[0];
      stats.qualityStats.max = qualities[qualities.length - 1];
      stats.qualityStats.mean = qualities.reduce((a, b) => a + b, 0) / qualities.length;
      stats.qualityStats.median = qualities[Math.floor(qualities.length / 2)];
    }

    return stats;
  }

  static isTransition(ref, alt) {
    const transitions = new Set(['AG', 'GA', 'CT', 'TC']);
    return transitions.has(ref + alt);
  }

  static findMutations(reference, sample) {
    const mutations = [];
    const minLength = Math.min(reference.sequence.length, sample.sequence.length);
    
    for (let i = 0; i < minLength; i++) {
      if (reference.sequence[i] !== sample.sequence[i]) {
        mutations.push({
          chrom: reference.id,
          pos: i + 1,
          id: `${reference.id}_${i + 1}`,
          ref: reference.sequence[i],
          alt: sample.sequence[i],
          qual: 60, // Default quality
          filter: 'PASS',
          info: {
            TYPE: 'SNP',
            GENERATED: true
          }
        });
      }
    }
    
    return mutations;
  }

  static simulateMutations(sequence, mutationRate = 0.001) {
    const bases = ['A', 'T', 'C', 'G'];
    let mutatedSequence = '';
    
    for (let i = 0; i < sequence.sequence.length; i++) {
      if (Math.random() < mutationRate) {
        // Introduce mutation
        const currentBase = sequence.sequence[i];
        const possibleBases = bases.filter(base => base !== currentBase);
        mutatedSequence += possibleBases[Math.floor(Math.random() * possibleBases.length)];
      } else {
        mutatedSequence += sequence.sequence[i];
      }
    }
    
    return {
      ...sequence,
      id: `${sequence.id}_mutated`,
      description: `${sequence.description} (mutated)`,
      sequence: mutatedSequence
    };
  }
}