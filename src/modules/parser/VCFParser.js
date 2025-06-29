export class VCFParser {
  static parse(content) {
    const lines = content.split('\n').filter(line => line.trim() && !line.startsWith('#'));
    const records = [];
    
    for (const line of lines) {
      const parts = line.split('\t');
      if (parts.length < 8) continue;
      
      const [chrom, pos, id, ref, alt, qual, filter, info] = parts;
      
      // Parse INFO field
      const infoObj = {};
      info.split(';').forEach(pair => {
        const [key, value] = pair.split('=');
        infoObj[key] = value || true;
      });
      
      records.push({
        chrom,
        pos: parseInt(pos),
        id: id === '.' ? `${chrom}_${pos}` : id,
        ref,
        alt,
        qual: parseFloat(qual) || 0,
        filter,
        info: infoObj
      });
    }
    
    return records;
  }

  static export(records) {
    const header = [
      '##fileformat=VCFv4.2',
      '##source=GENOME_Bioinformatics_v1.0',
      '#CHROM\tPOS\tID\tREF\tALT\tQUAL\tFILTER\tINFO'
    ].join('\n');
    
    const data = records.map(record => {
      const info = Object.entries(record.info)
        .map(([key, value]) => value === true ? key : `${key}=${value}`)
        .join(';');
      
      return [
        record.chrom,
        record.pos,
        record.id,
        record.ref,
        record.alt,
        record.qual || '.',
        record.filter || 'PASS',
        info
      ].join('\t');
    }).join('\n');
    
    return `${header}\n${data}`;
  }
}