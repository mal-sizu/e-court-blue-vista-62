
import React from 'react';
import { motion } from 'framer-motion';
import { ApprovalStatus } from '../../constants/dataTypes';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Calendar, 
  User, 
  MoreHorizontal,
  Eye,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface CaseRequest {
  id: string;
  requestNumber: string;
  caseTitle: string;
  caseCategory: string;
  caseType: string;
  createdDate: string;
  status: string;
  createdBy: string;
}

interface CaseRequestTableProps {
  caseRequests: CaseRequest[];
}

const CaseRequestTable = ({ caseRequests }: CaseRequestTableProps) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case ApprovalStatus.Pending:
        return { 
          color: 'bg-amber-100 text-amber-800 border-amber-200', 
          icon: Clock,
          iconColor: 'text-amber-600'
        };
      case ApprovalStatus.Approved:
        return { 
          color: 'bg-green-100 text-green-800 border-green-200', 
          icon: CheckCircle,
          iconColor: 'text-green-600'
        };
      case ApprovalStatus.Rejected:
        return { 
          color: 'bg-red-100 text-red-800 border-red-200', 
          icon: XCircle,
          iconColor: 'text-red-600'
        };
      default:
        return { 
          color: 'bg-gray-100 text-gray-800 border-gray-200', 
          icon: Clock,
          iconColor: 'text-gray-600'
        };
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="border-0 shadow-lg overflow-hidden">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Case Requests ({caseRequests.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Request Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Category & Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {caseRequests.map((request, index) => {
                  const statusConfig = getStatusConfig(request.status);
                  const StatusIcon = statusConfig.icon;
                  
                  return (
                    <motion.tr 
                      key={request.id}
                      className="hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-blue-600">{request.requestNumber}</p>
                          <p className="text-sm text-gray-900 font-medium">{request.caseTitle}</p>
                          <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <User className="h-3 w-3" />
                            <span>{request.createdBy}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-gray-900">{request.caseCategory}</p>
                          <p className="text-xs text-gray-500">{request.caseType}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          <span>{request.createdDate}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={`${statusConfig.color} flex items-center space-x-1 w-fit`}>
                          <StatusIcon className="h-3 w-3" />
                          <span>{request.status}</span>
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" className="h-8">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CaseRequestTable;
