import { createPortal } from 'react-dom'
import usePortal from '../../Hooks/usePortal'

type Props = {
  id: string;
  children?: React.ReactNode;
};

 const Portal = ({ id, children }: Props) => {
  const target = usePortal(id)
  return createPortal(children, target)
}

export default Portal