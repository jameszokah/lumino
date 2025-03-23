'use client'
import React from "react";
import { IconPlus } from "@/components/ui/icons";
import { useChatStore } from "@/store/state";
import { useRouter } from "next/navigation";

interface InitialQueriesProps {
  questions: string[];
  Icons: React.ReactNode[];
  handleFollowUpClick: (question: string) => void;
}

const InitialQueries = ({
  questions,
  Icons,
  handleFollowUpClick,
}: InitialQueriesProps) => {
  const {createChat} = useChatStore();
  const router = useRouter();

  const handleQuestionClick = (question: string) => {
    handleFollowUpClick(question);
   const chat = createChat({title: question,})
    router.replace(`chats/${chat.id}`)


  };

  return (
    <div className="mb-6">
      <div className="flex items-center"></div>
      <ul className="mt-2 grid grid-cols-2 md:grid-cols-3">
        {questions.map((question, index) => {
          const Icon = Icons[index];
          return (
            <li
              key={index}
              className="flex items-start cursor-pointer shadow-lg rounded-lg p-4 my-2 w-40  bg-slate-50 flex-col "
              onClick={() => handleQuestionClick(question)}
            >
              <span role="img" aria-label="link" className="mr-2  ">
                {
                  Icon
                }
              </span>
              <p className=" block sm:inline  font-semibold  ">
                {question}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  );
};

export default InitialQueries;
