"use client";

import { ItemBox } from "@/components/ItemBox";
import { TodoForm } from "@/components/TodoForm";
import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

const fetchData = async () => {
  const response = await fetch("http://localhost:5000/api/todos"); // Replace with your API endpoint
  return response.json();
};

export type Todo = {
  _id: string;
  body: string;
  completed: boolean;
};

const WorkPage = () => {
  const {
    data: todos,
    error,
    isLoading,
  } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: fetchData,
  });

  if (isLoading) {
    return <h1 className="mt-12 text-black font-extrabold">Loading....</h1>;
  }

  return (
    <div className="mt-12 px-4 h-full  ">
      <h1 className="text-2xl font-extrabold text-black ">Todos</h1>

      <TodoForm />
      <div className="flex flex-col gap-y-2 mt-2">
        {todos?.map((todo) => (
          <ItemBox todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default WorkPage;
