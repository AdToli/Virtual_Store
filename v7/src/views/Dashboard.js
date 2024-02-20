import { useState, useCallback } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';

const items = [
    {
        src: require('../assets/images/slide-1.png'),
        altText: 'Product',
        caption: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
        src: require('../assets/images/slide-2.png'),
        altText: 'Product',
        caption: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
        src: require('../assets/images/slide-3.png'),
        altText: 'Product',
        caption: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
];
const Dashboard = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const next = useCallback(() => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }, [activeIndex, animating]);

    const previous = useCallback(() => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }, [activeIndex, animating]);

    const goToIndex = useCallback((newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }, [animating]);

    const onExiting = () => {
        setAnimating(true);
    }

    const onExited = () => {
        setAnimating(false);
    }
    const slides = items.map((item) => {
        return (
            <CarouselItem
                onExiting={onExiting}
                onExited={onExited}
                key={item.src}
            >
                <img src={item.src} alt={item.altText} style={{ width: '100%', maxHeight: '850px'}} />
                <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
            </CarouselItem>
        );
    });
    return (
        <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
        >
            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
    )
}

export default Dashboard;