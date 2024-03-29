'use client';

import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { AnswerSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { Editor } from '@tinymce/tinymce-react';
import { useTheme } from '@/context/ThemeProvider';
import { Button } from '../ui/button';
import Image from 'next/image';
import { createAnswer } from '@/lib/actions/answer.action';
import { usePathname } from 'next/navigation';

interface Props {
  questionId: string;
  authorId: string;
  question: string;
}

const Answer = ({ questionId, authorId, question }: Props) => {
  const { mode } = useTheme();
  const editorRef = React.useRef<any | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: '',
    },
  });
  const pathname = usePathname();

  const handleCreateAnswer = async ({
    answer,
  }: z.infer<typeof AnswerSchema>) => {
    setIsSubmitting(true);
    try {
      await createAnswer({
        content: answer,
        author: JSON.parse(authorId),
        question: JSON.parse(questionId),
        path: pathname,
      });

      form.reset();
      if (editorRef.current) {
        editorRef.current.setContent('');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <div className='flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2'>
        <h4 className='paragraph-semibold text-dark400_light800'>
          Write your answer here
        </h4>
        <Button className='btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500'>
          <Image
            src='/assets/icons/stars.svg'
            alt='star'
            width={12}
            height={12}
            className='object-contain'
            onClick={() => {}}
          />
          Generate AI Answer
        </Button>
      </div>

      <Form {...form}>
        <form
          className='mt-6 flex w-full flex-col gap-10'
          onSubmit={form.handleSubmit(handleCreateAnswer)}
        >
          <FormField
            control={form.control}
            name='answer'
            render={({ field }) => (
              <FormItem className='flex w-full flex-col gap-3'>
                <FormControl className='mt-3.5'>
                  <Editor
                    key={mode}
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    init={{
                      height: 350,
                      menubar: false,
                      plugins:
                        'ai tinycomments mentions anchor autolink charmap codesample emoticons link lists searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
                      toolbar:
                        'undo redo | codesample | blocks | bold italic underline strikethrough forecolor | align lineheight | checklist numlist bullist | emoticons charmap',
                      skin: mode === 'dark' ? 'oxide-dark' : 'oxide',
                      content_css: mode === 'dark' ? 'dark' : 'light',
                    }}
                    onInit={(_event, editor) => {
                      editorRef.current = editor;
                    }}
                  />
                </FormControl>
                <FormMessage className='text-red-500' />
              </FormItem>
            )}
          />
          <div className='flex justify-end'>
            <Button
              type='submit'
              className='primary-gradient w-fit !text-light-900'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Answer;
