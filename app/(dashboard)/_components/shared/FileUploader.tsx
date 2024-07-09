'use client';
import { ourFileRouter } from '@/app/api/uploadthing/core';
import { UploadDropzone } from '@/lib/uploadthing';
import { toast } from 'sonner';

interface FileUploaderProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

const FileUploader = ({ endpoint, onChange }: FileUploaderProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      appearance={{
        button: 'ut-uploading:cursor-not-allowed',
        container: 'ut-uploading:cursor-not-allowed',
        label: 'ut-uploading:cursor-not-allowed'
      }}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        toast.error(error.message);
      }}
    />
  );
};

export default FileUploader;
