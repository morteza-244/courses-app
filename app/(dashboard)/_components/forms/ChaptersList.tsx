'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { TReorderData } from '@/types';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from '@hello-pangea/dnd';
import { Chapter } from '@prisma/client';
import { Grip, Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
interface ChaptersListProps {
  items: Chapter[];
  onReorder: (updateData: TReorderData[]) => void;
  onEdit: (id: string) => void;
}

const ChaptersList = ({ items, onEdit, onReorder }: ChaptersListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIndex, endIndex + 1);

    setChapters(items);

    const bulkUpdateData = updatedChapters.map(chapter => ({
      id: chapter.id,
      position: items.findIndex(item => item.id === chapter.id)
    }));

    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='chapters'>
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable
                key={chapter.id}
                draggableId={chapter.id}
                index={index}
              >
                {provided => (
                  <div
                    className={cn(
                      'mb-4 flex w-full items-center gap-x-3 rounded-md bg-slate-300 text-sm text-slate-700 shadow-md',
                      chapter.isPublished &&
                        'border-sky-200 bg-sky-100 text-indigo-700'
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        'rounded-l-md border-r border-r-slate-200 px-2 py-3 transition hover:bg-slate-300',
                        chapter.isPublished &&
                          'hover:bg-skt-200 border-r-sky-200'
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip size={20} />
                    </div>
                    {chapter.title}
                    <div className='ml-auto flex items-center gap-x-2 pr-2'>
                      <Badge
                        className={cn(
                          'bg-slate-500',
                          chapter.isPublished && 'bg-indigo-700'
                        )}
                      >
                        {chapter.isPublished ? 'Published' : 'Draft'}
                      </Badge>
                      <Pencil
                        size={20}
                        onClick={() => onEdit(chapter.id)}
                        className='cursor-pointer'
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ChaptersList;
