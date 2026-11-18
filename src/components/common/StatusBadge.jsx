import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Truck, 
  ShieldCheck, 
  XCircle,
  Droplet
} from 'lucide-react';

export const StatusBadge = ({ status }) => {
  switch (status) {
    case 'pending_verification':
    case 'requested':
      return (
        <span className="badge badge-warning">
          <Clock size={12} />
          Pending Verification
        </span>
      );
    case 'approved_for_collection':
    case 'assigned':
      return (
        <span className="badge badge-info">
          <ShieldCheck size={12} />
          Approved for Pickup
        </span>
      );
    case 'accepted':
      return (
        <span className="badge badge-info">
          <Truck size={12} />
          Tanker Dispatched
        </span>
      );
    case 'reached_collection_point':
      return (
        <span className="badge badge-info">
          <Truck size={12} />
          At Collection Point
        </span>
      );
    case 'water_collected':
      return (
        <span className="badge badge-info">
          <Droplet size={12} />
          Water Collected
        </span>
      );
    case 'screening_passed':
    case 'approved_for_transport':
      return (
        <span className="badge badge-success">
          <ShieldCheck size={12} />
          Quality Cleared
        </span>
      );
    case 'delivered':
    case 'completed':
      return (
        <span className="badge badge-success">
          <CheckCircle2 size={12} />
          Recharge Completed
        </span>
      );
    case 'in_progress':
      return (
        <span className="badge badge-info">
          <Truck size={12} />
          In Progress
        </span>
      );
    case 'rejected_contaminated':
    case 'rejected':
      return (
        <span className="badge badge-danger">
          <XCircle size={12} />
          Rejected / Diverted
        </span>
      );
    case 'available':
      return (
        <span className="badge badge-success">
          <CheckCircle2 size={12} />
          Available
        </span>
      );
    case 'busy':
      return (
        <span className="badge badge-warning">
          <Truck size={12} />
          On Duty
        </span>
      );
    case 'offline':
      return (
        <span className="badge badge-neutral">
          <Clock size={12} />
          Offline
        </span>
      );
    default:
      return (
        <span className="badge badge-neutral">
          {String(status || 'Unknown').replace(/_/g, ' ')}
        </span>
      );
  }
};

