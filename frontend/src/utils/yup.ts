import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: 'Это поле обязательное',
  },
  string: {
    min: ({ min }: { min: number }) =>
      `Это поле должно содержать не менее ${min} символов`,
    max: ({ max }: { max: number }) =>
      `Это поле должно содержать не более ${max} символов`,
  },
});

export { yup };
