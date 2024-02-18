import {useRouter} from 'next/router';
import {useState} from 'react';
import {useSignIn} from '../hooks/user';
import Page from '../components/Page';
import Field from "../components/Field";
import Input from "../components/Input";
import Button from "../components/Button";

function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signInError, signInLoading } = useSignIn();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const valid = await signIn(email, password);

    if (valid) {
      router.push('/');
    }
  };

  return (
    <Page title="Sign In">
      <form onSubmit={handleSubmit}>
        <Field label="Email">
          <Input type="email"
                 required
                 value={email}
                 onChange={(event) => setEmail(event.target.value)}
          />
        </Field>
        <Field label="Password">
          <Input type="password"
                 required
                 value={password}
                 onChange={(event) => setPassword(event.target.value)}
          />
        </Field>
        {signInError && (<p className="text-red-700">Invalid credentials</p>)}
        {signInLoading ? (
            <p>Loading...</p>
        ) : (
            <Button type="submit">Sign In</Button>
        )}
        <div>
          <p><strong>Try Demo Customer Access</strong></p>
          <p><span>Email: </span>alice@example.com</p>
          <p><span>Password: </span>Alice123</p>
          <br/>
          <p><span>Email: </span>bob@example.com</p>
          <p><span>Password: </span>Bob123</p>
        </div>
      </form>
    </Page>
  );
}

export default SignInPage;
