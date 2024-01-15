import type { Filter as FilterType } from '@/types';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from '@/components/ui/select';

interface Props {
  filters: FilterType[];
  className?: string;
  containerClass?: string;
}

const Filter: React.FC<Props> = ({ filters, className, containerClass }) => {
  return (
    <>
      <div className={`relative ${containerClass}`}>
        <Select>
          <SelectTrigger
            className={`${className}  body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5`}
          >
            <div className='line-clamp-1 flex-1 text-left'>
              <SelectValue placeholder='Select a Filter' />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {filters.map((filter) => (
                <SelectItem key={filter.value} value={filter.value}>
                  {filter.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default Filter;
