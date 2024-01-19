'use client';

import React from 'react';
import Image from 'next/image';
import { Editor } from '@tinymce/tinymce-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { QuestionsSchema } from '@/lib/validations';
import { Badge } from '@/components/ui/badge';
import { createQuestion } from '@/lib/actions/question.action';

const type: any = 'create';

function Question() {
  const editorRef = React.useRef(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const form = useForm<z.infer<typeof QuestionsSchema>>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: {
      title: '',
      explanation: '',
      tags: [],
    },
  });

  async function onSubmit(values: z.infer<typeof QuestionsSchema>) {
    setIsSubmitting(true);
    try {
      // make an async call to API => create a question
      // contain all form data
      console.log('submit');
      await createQuestion({});

      // navigate to home page
    } catch (error) {
      //
    } finally {
      //
    }
    console.log(values);
  }

  function handleInputKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>,
    field: ControllerRenderProps<typeof form, 'tags'>,
  ) {
    if (event.key === 'Enter' && field.name === 'tags') {
      event.preventDefault();
      const tagInput = event.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();
      if (tagValue !== '') {
        if (tagValue.length > 15) {
          return form.setError('tags', {
            type: 'required',
            message: 'Tag must be less than 15 characters.',
          });
        }
        if (!field.value.includes(tagValue as never)) {
          form.setValue('tags', [...field.value, tagValue]);
          tagInput.value = '';
          form.clearErrors('tags');
        }
      } else {
        form.trigger();
      }
    }
  }

  function handleBadgeRemove(
    tag: string,
    field: ControllerRenderProps<typeof form>,
  ) {
    const newTags = field.value.filter((t) => t !== tag);
    form.setValue('tags', newTags);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex w-full flex-col gap-10'
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col'>
              <FormLabel className='paragraph-semibold text-dark400_light800'>
                Question Title <span className='text-primary-500'>*</span>
              </FormLabel>
              <FormControl className='mt-3.5'>
                <Input
                  className='no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border'
                  {...field}
                />
              </FormControl>
              <FormDescription className='body-regular mt-2.5 text-light-500'>
                Be specific and imagine you&apos;re asking a question to another
                person.
              </FormDescription>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='explanation'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='paragraph-semibold text-dark400_light800'>
                Detailed explanation of your problem{' '}
                <span className='text-primary-500'>*</span>
              </FormLabel>
              <FormControl className='mt-3.5'>
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  obBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  init={{
                    height: 350,
                    menubar: false,
                    font_css: 'font-size: 16px',
                    plugins:
                      'ai tinycomments mentions anchor autolink charmap codesample emoticons link lists searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
                    toolbar:
                      'undo redo | codesample | blocks | bold italic underline strikethrough forecolor | align lineheight | checklist numlist bullist | emoticons charmap',
                    tinycomments_mode: 'embedded',
                    tinycomments_author: 'Author name',
                    mergetags_list: [
                      { value: 'First.Name', title: 'First Name' },
                      { value: 'Email', title: 'Email' },
                    ],
                  }}
                  onInit={(_event, editor) => {
                    editorRef.current = editor;
                  }}
                  initialValue=''
                />
              </FormControl>
              <FormDescription className='body-regular mt-2.5 text-light-500'>
                Introduce the problem and expand on what you put in the title
                minimum 20 characters.
              </FormDescription>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='tags'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col'>
              <FormLabel className='paragraph-semibold text-dark400_light800'>
                Tags <span className='text-primary-500'>*</span>
              </FormLabel>
              <FormControl className='mt-3.5'>
                <>
                  <Input
                    className='no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border'
                    placeholder='Add tags...'
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                  {field.value.length > 0 && (
                    <div className='flex-start mt-2.5 gap-2.5'>
                      {field.value.map((tag) => (
                        <Badge
                          key={tag}
                          className='subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize'
                        >
                          {tag}
                          <Image
                            src='/assets/icons/close.svg'
                            alt='Close icon'
                            width={12}
                            height={12}
                            className='cursor-pointer object-contain invert-0 dark:invert'
                            onClick={() => handleBadgeRemove(tag, field)}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription className='body-regular mt-2.5 text-light-500'>
                Add up to 3 tags to describe what your question is about. You
                need to perss enter to add a tag.
              </FormDescription>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='primary-gradient w-fit !text-light-900'
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>{type === 'edit' ? 'Editing...' : 'Posting...'}</>
          ) : (
            <>{type === 'edit' ? 'Edit Question' : 'Ask a Question'}</>
          )}
        </Button>
      </form>
    </Form>
  );
}

export default Question;
