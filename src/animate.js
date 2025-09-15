export function switchCaroussel(element, setIndex, initialDirection) {
    let z = 1;
    let x = 0;
    let direction = initialDirection;
    let phase = 'out';

    const widthParent = element.parentNode.clientWidth;
    const elementWidth = element.clientWidth;
    const decalage = (widthParent - elementWidth) / 2;

    function animate() {
        element.style.transform = `translateX(${x}px)`;
        x += 9.5 * direction;
        
        element.style.opacity = Math.max(0, Math.min(1, z));
        phase === 'out' ? z -= 0.026 : z += 0.026



        if (initialDirection === -1) {
            if (direction === -1 && x <= -decalage) {
                setIndex((prev) => (prev === 0 ? prev : prev - 1));
                direction = 1;
                phase = 'in';
            } else if (direction === 1 && x >= 0) {
                element.style.transform = `translateX(0px)`;
                element.style.opacity = 1;
                return;
            }
        } else {
            if (direction === 1 && x >= decalage) {
                setIndex((prev) => (prev === 6 ? prev : prev + 1));
                direction = -1;
                phase = 'in';
            } else if (direction === -1 && x <= 0) {
                element.style.transform = `translateX(0px)`;
                element.style.opacity = 1;
                return;
            }
        }

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}