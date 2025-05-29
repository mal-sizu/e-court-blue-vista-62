import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { File, Image, Video, FileText, Search, Filter, Plus, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogTrigger, DialogContent } from '../ui/dialog';
import { UploadEvidenceForm } from '../forms';
import { searchEvidence } from '../../services/evidenceService';

const iconMap = {
  Document: FileText,
  Video: Video,
  Image: Image,
  Audio: File, // fallback for audio
};

const EvidencePage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [evidenceItems, setEvidenceItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvidence = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await searchEvidence();
        // Map icon for each evidence item
        const mapped = (Array.isArray(data) ? data : []).map((item) => ({
          ...item,
          icon: iconMap[item.type] || File,
        }));
        setEvidenceItems(mapped);
      } catch (err) {
        setError('Failed to load evidence items.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvidence();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Verified': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Approved': return 'bg-blue-100 text-blue-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Document': return 'bg-blue-100 text-blue-800';
      case 'Video': return 'bg-purple-100 text-purple-800';
      case 'Image': return 'bg-green-100 text-green-800';
      case 'Audio': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading evidence...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Evidence</h1>
          <p className="text-gray-600">Manage and track evidence items</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Upload Evidence
            </Button>
          </DialogTrigger>
          <DialogContent>
            <UploadEvidenceForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search evidence..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  List
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Evidence Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {evidenceItems.map((evidence, index) => {
            const IconComponent = evidence.icon;
            return (
              <motion.div
                key={evidence.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <IconComponent className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-sm font-medium">{evidence.id}</CardTitle>
                          <Badge variant="outline" className={getTypeColor(evidence.type)}>
                            {evidence.type}
                          </Badge>
                        </div>
                      </div>
                      <Badge className={getStatusColor(evidence.status)}>{evidence.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm font-medium text-gray-900 line-clamp-2">{evidence.name}</p>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Size:</span>
                        <span className="font-medium">{evidence.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Case:</span>
                        <span className="font-medium text-blue-600">{evidence.caseId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Uploaded:</span>
                        <span className="font-medium">{evidence.uploadDate}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-xs text-gray-500">By {evidence.uploadedBy}</span>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-700">Evidence ID</th>
                    <th className="text-left p-4 font-medium text-gray-700">Name</th>
                    <th className="text-left p-4 font-medium text-gray-700">Type</th>
                    <th className="text-left p-4 font-medium text-gray-700">Size</th>
                    <th className="text-left p-4 font-medium text-gray-700">Case</th>
                    <th className="text-left p-4 font-medium text-gray-700">Status</th>
                    <th className="text-left p-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {evidenceItems.map((evidence, index) => (
                    <motion.tr
                      key={evidence.id}
                      className="border-b hover:bg-gray-50 cursor-pointer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <td className="p-4 font-medium text-blue-600">{evidence.id}</td>
                      <td className="p-4">{evidence.name}</td>
                      <td className="p-4">
                        <Badge variant="outline" className={getTypeColor(evidence.type)}>
                          {evidence.type}
                        </Badge>
                      </td>
                      <td className="p-4">{evidence.size}</td>
                      <td className="p-4 text-blue-600 font-medium">{evidence.caseId}</td>
                      <td className="p-4">
                        <Badge className={getStatusColor(evidence.status)}>{evidence.status}</Badge>
                      </td>
                      <td className="p-4">
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EvidencePage;
