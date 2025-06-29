export const GenomeSequenceType = {
  DNA: 'DNA',
  RNA: 'RNA',
  PROTEIN: 'PROTEIN'
};

export const TaskStatus = {
  PENDING: 'pending',
  RUNNING: 'running',
  COMPLETED: 'completed',
  ERROR: 'error'
};

export const TaskType = {
  ALIGNMENT: 'alignment',
  MUTATION: 'mutation',
  ASSEMBLY: 'assembly',
  ANNOTATION: 'annotation'
};

export const AlignmentAlgorithm = {
  SMITH_WATERMAN: 'smith-waterman',
  NEEDLEMAN_WUNSCH: 'needleman-wunsch'
};

export const FileFormat = {
  FASTA: 'fasta',
  FASTQ: 'fastq',
  VCF: 'vcf',
  GFF: 'gff',
  SAM: 'sam',
  BAM: 'bam'
};