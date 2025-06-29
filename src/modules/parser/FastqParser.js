export class FastqParser {
  static parse(content) {
    const lines = content.split('\n').filter(line => line.trim());
    const sequences = [];
    
    for (let i = 0; i < lines.length; i += 4) {
      if (i + 3 >= lines.length) break;
      
      const header = lines[i];
      const sequence = lines[i + 1];
      const separator = lines[i + 2];
      const quality = lines[i + 3];
      
      if (!header.startsWith('@') || !separator.startsWith('+')) {
        console.warn(`Invalid FASTQ format at line ${i + 1}`);
        continue;
      }
      
      const id = header.substring(1).split(' ')[0];
      const description = header.substring(1).split(' ').slice(1).join(' ');
      
      sequences.push({
        id,
        description,
        sequence: sequence.toUpperCase(),
        quality,
        length: sequence.length,
        type: 'DNA'
      });
    }
    
    return sequences;
  }

  static export(sequences) {
    return sequences.map(seq => {
      const quality = seq.quality || 'I'.repeat(seq.sequence.length);
      return `@${seq.id} ${seq.description}\n${seq.sequence}\n+\n${quality}`;
    }).join('\n');
  }
}