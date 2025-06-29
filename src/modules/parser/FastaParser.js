export class FastaParser {
  static parse(content) {
    const lines = content.split('\n').filter(line => line.trim());
    const sequences = [];
    let currentRecord = {};

    for (const line of lines) {
      if (line.startsWith('>')) {
        // Save previous record if exists
        if (currentRecord.sequence) {
          sequences.push(this.recordToSequence(currentRecord));
        }
        
        // Parse header
        const header = line.substring(1).trim();
        const parts = header.split(' ');
        currentRecord = {
          id: parts[0],
          description: parts.slice(1).join(' '),
          header: header,
          sequence: ''
        };
      } else {
        // Accumulate sequence
        if (currentRecord) {
          currentRecord.sequence = (currentRecord.sequence || '') + line.trim().toUpperCase();
        }
      }
    }

    // Add last record
    if (currentRecord.sequence) {
      sequences.push(this.recordToSequence(currentRecord));
    }

    return sequences;
  }

  static recordToSequence(record) {
    return {
      id: record.id,
      description: record.description,
      sequence: record.sequence,
      length: record.sequence.length,
      type: this.detectSequenceType(record.sequence)
    };
  }

  static detectSequenceType(sequence) {
    const dnaChars = /^[ATCGN]+$/i;
    const rnaChars = /^[AUCGN]+$/i;
    
    if (dnaChars.test(sequence)) return 'DNA';
    if (rnaChars.test(sequence)) return 'RNA';
    return 'PROTEIN';
  }

  static export(sequences) {
    return sequences.map(seq => 
      `>${seq.id} ${seq.description}\n${seq.sequence.match(/.{1,80}/g)?.join('\n') || seq.sequence}`
    ).join('\n\n');
  }
}