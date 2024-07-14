'use client';
import { Button } from '@/components/ui/button';
import { FileUploader } from '@/dashboardComponents/shared';
import { ToastMessage } from '@/enums';
import { createAttachment } from '@/lib/actions/attachments.action';
import { Attachment, Course } from '@prisma/client';
import { File, PlusCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

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
    try {
      const res = await createAttachment({
        courseId,
        url: data.url,
        pathname
      });
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success(ToastMessage.success);
        toggleEditing();
      }
    } catch {
      toast.error(ToastMessage.error);
    }
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
          {course.attachment.length > 0 && (
            <div className='space-y-2'>
              {course.attachment.map(item => (
                <div
                  key={item.id}
                  className='flex w-full items-center rounded-md bg-sky-100 p-3 text-indigo-600'
                >
                  <File size={20} className='mr-1' />
                  <p className='line-clamp-1 text-sm'>{item.name}</p>
                </div>
              ))}
            </div>
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
