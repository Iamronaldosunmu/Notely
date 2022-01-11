import React from 'react';

interface ContentButtonProps {
    selected: boolean;
    title: string;
    onClick: () => void;
}

const ContentButton : React.FC<ContentButtonProps> = ({selected, title, onClick}) => {
    const contentButtonClasses: string = "contentButton w-[160px] mb-[15px] flex flex-col items-center";
    return (
        <button className={selected ? contentButtonClasses + " selected" : contentButtonClasses} onClick={onClick}>
                <p className="transition duration-150 text-[24px] dark:text-[white] mb-[4px]">{title}</p>
                <div className="transition duration-150"></div>
        </button>
    );
};

export default ContentButton;