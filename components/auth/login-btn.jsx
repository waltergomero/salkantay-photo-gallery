import { Button } from "@/components/ui/button";
import { useFormStatus } from 'react-dom';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

const LoginButton = () => {
    const { pending } = useFormStatus();
  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
    Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
  </Button>
  )
}

export default LoginButton

