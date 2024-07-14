'use client';
import { Button } from '@/components/ui/button';
import { FileUploader } from '@/dashboardComponents/shared';
import { Attachment, Course } from '@prisma/client';
import { PlusCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface CourseAttachmentsFormProps {
  course: Course & { attachment: Attachment[] };
  courseId: string;
}

const CourseAttachmentsForm = ({
  courseId,
  course
}: CourseAttachmentsFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const pathname = usePathname();

  const toggleEditing = () => {
    setIsEditing(current => !current);
  };

  const onSubmit = async (data: { url: string }) => {
    console.log(data.url);
  };

  return (
    <div className='space-y-2.5 rounded-md bg-slate-200 p-4'>
      <div className='flex items-center justify-between'>
        <h2 className='font-semibold'>Course Attachments</h2>
        <Button
          type='button'
          variant={'secondary'}
          size={'sm'}
          onClick={toggleEditing}
        >
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle size={17} className='mr-1' />
              Add a file
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <>
          {course.attachment.length === 0 && (
            <p className='text-sm italic text-slate-500'>No attachments</p>
          )}
        </>
      )}

      {isEditing && (
        <div>
          <FileUploader
            endpoint='courseAttachment'
            onChange={url => {
              if (url) {
                onSubmit({
                  url
                });
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CourseAttachmentsForm;
