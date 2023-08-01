import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useAuth } from '../hooks';
import routes from '../routes.js';
import avatarImages from '../assets/avatar_1.jpg';

const Registration = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .trim()
      .required('signup.required')
      .min(3, 'signup.usernameConstraints')
      .max(20, 'signup.usernameConstraints'),
    password: yup
      .string()
      .trim()
      .required('signup.required')
      .min(6, 'signup.passMin'),
    confirmPassword: yup
      .string()
      .test('confirmPassword', 'signup.mustMatch', (value, context) => value === context.parent.password),
  });

  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setRegistrationFailed(false);

      try {
        const res = await axios.post(
          routes.signupPath(),
          { username: values.username, password: values.password },
        );
        auth.logIn(res.data);
        navigate(routes.chatPagePath());
      } catch (err) {
        if (!err.isAxiosError) {
          throw err;
        }

        if (err.response.status === 409) {
          setRegistrationFailed(true);
          inputRef.current.select();
          return;
        }

        throw err;
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div
              className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5"
            >
              <div>
                <img
                  src={avatarImages}
                  className="rounded-circle"
                  alt={t('signup.header')}
                />
              </div>
              <Form onSubmit={f.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{t('signup.header')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={f.handleChange}
                    onBlur={f.handleBlur}
                    value={f.values.username}
                    placeholder={t('signup.usernameConstraints')}
                    name="username"
                    id="username"
                    autoComplete="username"
                    isInvalid={
                                            (f.errors.username && f.touched.username)
                                            || registrationFailed
                                        }
                    required
                    ref={inputRef}
                  />
                  <Form.Label htmlFor="username">{t('signup.username')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip placement="right">
                    {t(f.errors.username)}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    onChange={f.handleChange}
                    onBlur={f.handleBlur}
                    value={f.values.password}
                    placeholder={t('signup.passMin')}
                    name="password"
                    id="password"
                    aria-describedby="passwordHelpBlock"
                    isInvalid={
                                            (f.errors.password && f.touched.password)
                                            || registrationFailed
                                        }
                    required
                    autoComplete="new-password"
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {t(f.errors.password)}
                  </Form.Control.Feedback>
                  <Form.Label htmlFor="password">{t('signup.password')}</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    type="password"
                    onChange={f.handleChange}
                    onBlur={f.handleBlur}
                    value={f.values.confirmPassword}
                    placeholder={t('signup.mustMatch')}
                    name="confirmPassword"
                    id="confirmPassword"
                    isInvalid={
                                            (f.errors.confirmPassword && f.touched.confirmPassword)
                                            || registrationFailed
                                        }
                    required
                    autoComplete="new-password"
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {registrationFailed
                          ? t('signup.alreadyExists')
                          : t(f.errors.confirmPassword)}
                  </Form.Control.Feedback>
                  <Form.Label htmlFor="confirmPassword">{t('signup.confirm')}</Form.Label>

                </Form.Group>
                <Button
                  type="submit"
variant="outline-primary"
                  className="w-100"
                >
                  {t('signup.submit')}
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
