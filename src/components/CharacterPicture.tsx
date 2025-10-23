import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Upload, X, User } from "lucide-react";

interface CharacterPictureProps {
  imageUrl: string | null;
  setImageUrl: (url: string | null) => void;
}

export function CharacterPicture({ imageUrl, setImageUrl }: CharacterPictureProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImageUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const removeImage = () => {
    setImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Character Picture</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          {/* Image Display Area */}
          <div 
            className={`relative w-48 h-48 border-2 border-dashed rounded-lg transition-colors ${
              isDragOver 
                ? 'border-primary bg-primary/10' 
                : 'border-border hover:border-primary/50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {imageUrl ? (
              <div className="relative w-full h-full">
                <ImageWithFallback
                  src={imageUrl}
                  alt="Character"
                  className="w-full h-full object-cover rounded-lg"
                />
                <Button
                  onClick={removeImage}
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2 h-6 w-6"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <div 
                className="w-full h-full flex flex-col items-center justify-center text-muted-foreground cursor-pointer"
                onClick={openFileDialog}
              >
                <User className="h-16 w-16 mb-2" />
                <p className="text-center">
                  Drop image here or<br />
                  <span className="text-primary hover:underline">click to upload</span>
                </p>
              </div>
            )}
          </div>

          {/* Upload Controls */}
          <div className="flex gap-2">
            <Button 
              onClick={openFileDialog}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Upload Image
            </Button>
            {imageUrl && (
              <Button onClick={removeImage} variant="destructive">
                Remove
              </Button>
            )}
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
      </CardContent>
    </Card>
  );
}