  import React, { useState, useCallback } from 'react';
  import { useForm } from 'react-hook-form';
  import { zodResolver } from '@hookform/resolvers/zod';
  import { z } from 'zod';
  import { motion } from 'framer-motion';
  import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
  } from '../ui/form';
  import { Input } from '../ui/input';
  import { Button } from '../ui/button';
  import { Textarea } from '../ui/textarea';
  import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
  } from '../ui/select';
  import { Upload, FileText, X } from 'lucide-react';
  import { useToast } from '../ui/use-toast';

  const uploadEvidenceSchema = z.object({
    evidenceType: z.enum(['document', 'image', 'video', 'audio', 'physical'], {
      errorMap: () => ({ message: 'Please select an evidence type' })
    }),
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    caseId: z.string().min(1, 'Case ID is required'),
    submittedBy: z.string().min(1, 'Submitted by is required'),
    chainOfCustody: z.string().optional(),
    tags: z.string().optional()
  });

  type UploadEvidenceFormData = z.infer<typeof uploadEvidenceSchema>;

  const UploadEvidenceForm: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [dragActive, setDragActive] = useState(false);
    const { toast } = useToast();

    const form = useForm<UploadEvidenceFormData>({
      resolver: zodResolver(uploadEvidenceSchema),
      defaultValues: {
        evidenceType: 'document',
        title: '',
        description: '',
        caseId: '',
        submittedBy: '',
        chainOfCustody: '',
        tags: ''
      }
    });

    const handleDrag = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
    
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const newFiles = Array.from(e.dataTransfer.files);
        setFiles(prev => [...prev, ...newFiles]);
      }
    }, []);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const newFiles = Array.from(e.target.files);
        setFiles(prev => [...prev, ...newFiles]);
      }
    };

    const removeFile = (index: number) => {
      setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (data: UploadEvidenceFormData) => {
      if (files.length === 0) {
        toast({
          title: "Error",
          description: "Please select at least one file to upload",
          variant: "destructive"
        });
        return;
      }

      setLoading(true);
      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Evidence data:', data, 'Files:', files);
      
        toast({
          title: "Success",
          description: "Evidence uploaded successfully",
        });
      
        form.reset();
        setFiles([]);
      } catch (error) {
        console.error('Error uploading evidence:', error);
        toast({
          title: "Error",
          description: "Failed to upload evidence. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    const evidenceTypeOptions = [
      { value: 'document', label: 'Document' },
      { value: 'image', label: 'Image/Photo' },
      { value: 'video', label: 'Video' },
      { value: 'audio', label: 'Audio Recording' },
      { value: 'physical', label: 'Physical Evidence' }
    ];

    return (
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Upload className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Upload Evidence</h1>
          </div>
          <p className="text-gray-600">Submit digital evidence for case proceedings</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            {/* File Upload Area */}
            <motion.div 
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              style={{
                borderColor: dragActive ? '#3b82f6' : '#d1d5db',
                backgroundColor: dragActive ? '#eff6ff' : files.length > 0 ? '#f0fdf4' : '#f9fafb'
              }}
            >
              <Upload className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <div className="text-xl font-semibold text-gray-900 mb-2">
                Drag and drop files here, or click to select
              </div>
              <input
                type="file"
                multiple
                className="hidden"
                id="file-upload"
                onChange={handleFileSelect}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4,.mp3,.wav"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Select Files
              </label>
              <p className="text-sm text-gray-500 mt-3">
                Supported formats: PDF, DOC, DOCX, JPG, PNG, MP4, MP3, WAV (Max 50MB per file)
              </p>
            </motion.div>

            {/* Selected Files */}
            {files.length > 0 && (
              <motion.div 
                className="space-y-3 bg-green-50 p-6 rounded-lg border border-green-200"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <h4 className="font-semibold text-green-800 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Selected Files ({files.length})
                </h4>
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-white p-4 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <div>
                        <span className="text-sm font-medium text-gray-900">{file.name}</span>
                        <p className="text-xs text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </motion.div>
            )}

            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <FormField
                control={form.control}
                name="evidenceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">Evidence Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select evidence type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {evidenceTypeOptions.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="caseId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">Case ID</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter case ID" 
                        className="h-12"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Evidence Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter evidence title" 
                      className="h-12"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Provide detailed description of the evidence" 
                      className="min-h-[120px] resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <FormField
                control={form.control}
                name="submittedBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">Submitted By</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter submitter name" 
                        className="h-12"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">Tags (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter tags separated by commas" 
                        className="h-12"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <FormField
              control={form.control}
              name="chainOfCustody"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Chain of Custody (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Document the chain of custody for this evidence" 
                      className="min-h-[100px] resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4 pt-8 border-t border-gray-200">
              <Button 
                type="button" 
                variant="outline" 
                size="lg"
                onClick={() => {
                  form.reset();
                  setFiles([]);
                }}
                className="px-8"
              >
                Clear Form
              </Button>
              <Button 
                type="submit" 
                disabled={loading}
                size="lg"
                className="px-8 bg-blue-600 hover:bg-blue-700"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Uploading...
                  </>
                ) : (
                  'Upload Evidence'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    );
  };

  export default UploadEvidenceForm;
