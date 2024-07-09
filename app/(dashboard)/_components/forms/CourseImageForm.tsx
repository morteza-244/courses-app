'use client';
import { Button } from '@/components/ui/button';
import { FileUploader } from '@/dashboardComponents/shared';
import { ToastMessage } from '@/enums';
import { updateCourseTitle } from '@/lib/actions/course.action';
import { Pencil, PlusCircle } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface CourseImageFormProps {
  imageUrl: string;
  courseId: string;
}

const CourseImageForm = ({ courseId, imageUrl }: CourseImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const pathname = usePathname();

  const toggleEditing = () => {
    setIsEditing(current => !current);
  };

  const onSubmit = async (data: { imageUrl: string }) => {
    try {
      const res = await updateCourseTitle({
        courseId,
        course: {
          imageUrl: data.imageUrl
        },
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
        <h2 className='font-semibold'>Course Image</h2>
        <Button
          type='button'
          variant={'secondary'}
          size={'sm'}
          onClick={toggleEditing}
        >
          {isEditing && <>Cancel</>}
          {!isEditing && !imageUrl && (
            <>
              <PlusCircle size={17} className='mr-1' />
              Add an image
            </>
          )}
          {!isEditing && imageUrl && (
            <>
              <Pencil size={17} className='mr-1' />
              Edit image
            </>
          )}
        </Button>
      </div>

      {!isEditing &&
        (!imageUrl ? (
          <div className='flex h-60 w-full flex-col items-center justify-center rounded-lg bg-slate-300'>
            <img src='/images/file-upload.svg' alt='Upload' />
          </div>
        ) : (
          <div className='relative aspect-video'>
            <Image
              src={imageUrl}
              alt='Uploaded image'
              fill
              className='rounded-lg object-cover'
            />
          </div>
        ))}

      {isEditing && (
        <div>
          <FileUploader
            endpoint='courseImage'
            onChange={url => {
              if (url) {
                onSubmit({
                  imageUrl: url
                });
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CourseImageForm;
