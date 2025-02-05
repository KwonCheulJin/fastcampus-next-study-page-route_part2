interface Props {
  name: string;
}
export default function Title({ name }: Props) {
  return <h1 className="font-bold text-2xl mb-6">{name}</h1>;
}
