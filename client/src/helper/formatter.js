import DOMPurify from 'dompurify';

export const getFormattedText = (html) => {
    return {__html: DOMPurify.sanitize(html)}
}