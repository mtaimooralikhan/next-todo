import prisma from '@/db';
import Image from 'next/image'
import Link from 'next/link'
import { TodoItem } from '@/component/TodoItem';

 function getTodos(){
    return prisma.todo.findMany();
  }

  async function toggleTodo(id: string, completed: boolean){
    "use server"
    await prisma.todo.update({where:{id}, data:{completed}})
    
  }

export default async function Home() {

  const todos = await getTodos();
  return (
    <>
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-2xl">Todos</h1>
      <Link
        className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        href="/new"
      >
        New
      </Link>
    </header>
    <ul className="pl-4">
      {todos.map(todo => (
        <TodoItem key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} toggleTodo={toggleTodo} />

        // <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  </>
  )
}
