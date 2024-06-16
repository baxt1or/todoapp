import { Todo } from "@/app/(main)/work/page";
import { useMutation } from "react-query";

export const ItemBox = ({ todo }: { todo: Todo }) => {
  return <h1 className="text-lg font-light">{todo.body}</h1>;
};
