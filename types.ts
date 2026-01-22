
export interface DiopterInput {
  id: number;
  value: string;
}

export type CalibrationStatus = 'idle' | 'success' | 'failure';

export interface CalibrationResult {
  status: CalibrationStatus;
  code?: string;
  errorCodes?: string[];
}
