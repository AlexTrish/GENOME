import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { useGenomeStore } from '../../store';
import { FastaParser } from '../../modules/parser/FastaParser';
import { FastqParser } from '../../modules/parser/FastqParser';
import { VCFParser } from '../../modules/parser/VCFParser';

const SUPPORTED_FORMATS = {
  '.fasta': 'FASTA sequence files',
  '.fa': 'FASTA sequence files',
  '.fas': 'FASTA sequence files',
  '.fastq': 'FASTQ sequence files',
  '.fq': 'FASTQ sequence files',
  '.vcf': 'Variant Call Format files',
  '.gff': 'Gene Feature Format files',
  '.gff3': 'Gene Feature Format files',
  '.sam': 'Sequence Alignment Map files',
  '.bam': 'Binary Alignment Map files'
};

export const FileDropzone = () => {
  const { addSequence, addVCFRecords } = useGenomeStore();

  const processFile = useCallback(async (file) => {
    const text = await file.text();
    const extension = file.name.toLowerCase().match(/\.[^.]+$/)?.[0];

    try {
      switch (extension) {
        case '.fasta':
        case '.fa':
        case '.fas':
          const fastaSequences = FastaParser.parse(text);
          fastaSequences.forEach(seq => addSequence(seq));
          break;
          
        case '.fastq':
        case '.fq':
          const fastqSequences = FastqParser.parse(text);
          fastqSequences.forEach(seq => addSequence(seq));
          break;
          
        case '.vcf':
          const vcfRecords = VCFParser.parse(text);
          addVCFRecords(vcfRecords);
          break;
          
        default:
          throw new Error(`Unsupported file format: ${extension}`);
      }
    } catch (error) {
      console.error('Error processing file:', error);
      alert(`Error processing file ${file.name}: ${error}`);
    }
  }, [addSequence, addVCFRecords]);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach(processFile);
  }, [processFile]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'text/plain': Object.keys(SUPPORTED_FORMATS),
      'application/octet-stream': ['.bam']
    },
    multiple: true
  });

  return (
    <div className="p-6">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }
          ${isDragReject ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center gap-4">
          {isDragReject ? (
            <AlertCircle className="w-12 h-12 text-red-500" />
          ) : (
            <Upload className="w-12 h-12 text-gray-400" />
          )}
          
          {isDragActive ? (
            <p className="text-lg font-medium text-blue-600 dark:text-blue-400">
              Drop files here...
            </p>
          ) : (
            <div>
              <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Drag & drop genomic files here
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                or click to browse files
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400 max-w-md">
            {Object.entries(SUPPORTED_FORMATS).map(([ext, desc]) => (
              <div key={ext} className="flex items-center gap-1">
                <FileText className="w-3 h-3" />
                <span>{ext.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};