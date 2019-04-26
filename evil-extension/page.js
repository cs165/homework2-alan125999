const MATCH_LIST = {
  'there': 'their',
  'their': 'there',
  'they\'re': 'there',
  'There': 'Their',
  'Their': 'There',
  'They\'re': 'There',
  'THERE': 'THEIR',
  'THEIR': 'THERE',
  'THEY\'RE': 'THERE'
};
function transformTextNodes(node) {
  // TODO(you): Implement this function! See HW spec for details.
  if (node.nodeType === Node.TEXT_NODE && node.nodeName !== 'STYLE' && node.nodeName !== 'SCRIPT') {
    let words = node.textContent.split(/\s+/);
    words = words.map(value => MATCH_LIST.hasOwnProperty(value) ? MATCH_LIST[value] : value)
    node.textContent = words.join(' ');
  }
  node.childNodes.forEach(value => transformTextNodes(value));
}

transformTextNodes(document.body);

// Log statement to test that the extension loaded properly.
console.log('Evil extension loaded!');
console.log('Extension updated');
