import { test } from '../_fixtures/fixtures';
import {
  EMPTY_USERNAME_MESSAGE,
  EMPTY_PASSWORD_MESSAGE,
  INVALID_EMAIL_MESSAGE,
} from '../../src/ui/constants/authErrorMessages';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';

const user = generateNewUserData();
const testParameters = [
  {
    email: user.email,
    username: '',
    password: user.password,
    message: EMPTY_USERNAME_MESSAGE,
    title: 'empty username',
  },
  {
    email: user.email,
    username: user.username,
    password: '',
    message: EMPTY_PASSWORD_MESSAGE,
    title: 'empty password',
  },
  {
    email: '',
    username: user.username,
    password: user.password,
    message: INVALID_EMAIL_MESSAGE,
    title: 'empty email',
  },
];

testParameters.forEach(({ email, username, password, message, title }) => {
  test.describe('Sign up negative tests', () => {
    test(`Sign up with ${title}`, async ({ user, signUpPage }) => {
      await signUpPage.open();
      await signUpPage.fillUsernameField(username);
      await signUpPage.fillEmailField(email);
      await signUpPage.fillPasswordField(password);
      await signUpPage.clickSignUpButton();

      await signUpPage.assertErrorMessageContainsText(message);
    });
  });
});

