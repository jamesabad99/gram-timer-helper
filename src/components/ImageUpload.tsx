
import { useState, useRef, useCallback } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      toast.error('Please upload an image file');
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }
    
    setIsLoading(true);
    
    // Read file and convert to data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        onChange(e.target.result);
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
      toast.error('Error reading file');
      setIsLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    onChange('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      {value ? (
        <div className="relative rounded-lg overflow-hidden aspect-square">
          <img 
            src={value} 
            alt="Preview" 
            className="w-full h-full object-cover transition-all duration-500 animate-scale"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-apple"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg transition-all p-8 text-center ${
            dragActive 
              ? 'border-primary/70 bg-primary/5' 
              : 'border-border hover:border-primary/50 hover:bg-secondary/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="p-3 bg-secondary rounded-full">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <div className="flex flex-col space-y-1">
              <h3 className="text-sm font-medium">Drop your image here or click to browse</h3>
              <p className="text-xs text-muted-foreground">
                PNG, JPG up to 5MB
              </p>
            </div>
            <Button
              disabled={isLoading}
              variant="outline"
              onClick={() => inputRef.current?.click()}
              className="relative"
            >
              {isLoading ? 'Uploading...' : 'Select Image'}
            </Button>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
