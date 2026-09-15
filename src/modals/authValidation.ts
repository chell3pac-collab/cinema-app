export const validateEmail = (val: string): string | null => {
  const clean = val.replace(/["\u00A0\u200B]+/g, '');

  if (!clean) return 'Email обязателен';

  const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return re.test(clean) ? null : 'Некорректный email';
};

export const validatePassword = (val: string): string | null => {
  if (val.length < 6) return 'Пароль должен быть не менее 6 символов';
  return null;
};

export const validateName = (val: string): string | null => {
  if (!val.trim()) return 'Поле обязательно';
  return null;
};

export const validateRegistrationForm = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  const errors: Record<string, string | undefined> = {};
  const cleanEmail = email.trim()
  const emailErr = validateEmail(cleanEmail);
  const passErr = validatePassword(password);
  const confErr = password !== confirmPassword ? 'Пароли не совпадают' : null;
  const firstNameErr = validateName(firstName);
  const lastNameErr = validateName(lastName);

  if (emailErr) errors.email = emailErr;
  if (passErr) errors.password = passErr;
  if (confErr) errors.confirmPassword = confErr;
  if (firstNameErr) errors.firstName = firstNameErr;
  if (lastNameErr) errors.lastName = lastNameErr;

  return errors;
};

export const validateLoginForm = (email: string, password: string) => {
  const errors: Record<string, string | undefined> = {};
  const cleanEmail = email.trim();
  const emailErr = validateEmail(cleanEmail);
  const passErr = validatePassword(password);

  if (emailErr) errors.email = emailErr;
  if (passErr) errors.password = passErr;

  return errors;
};
