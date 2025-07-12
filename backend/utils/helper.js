function extractEmails(text){
    const emailRegex = /[\w.-]+@[\w.-]+\.\w+/g;
    return text.match(emailRegex) || [];
}

module.exports = {extractEmails};