
export const generateUniqueCode = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `CAL-${timestamp}-${randomStr}`;
};

export const validateDiopter = (val: string): boolean => {
  if (!val) return false;
  
  // Substitui vírgula por ponto para garantir a conversão numérica correta
  const normalizedVal = val.replace(',', '.');
  const num = parseFloat(normalizedVal);
  
  if (isNaN(num)) return false;
  
  // Conforme solicitado: deve estar entre 0.25 e 0.50 (inclusive)
  return num >= 0.25 && num <= 0.50;
};
