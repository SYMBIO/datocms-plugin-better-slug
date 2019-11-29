import './style.css';
import slugify from 'slugify';

function getValue(plugin, fields) {
  const parts = [];
  fields.forEach((field) => {
    const fieldValue = plugin.getFieldValue(field);
    if (fieldValue) {
      if (typeof fieldValue === 'object' && Object.prototype.hasOwnProperty.call(fieldValue, plugin.locale)) {
        if (typeof fieldValue[plugin.locale] === 'string') {
          parts.push(slugify(fieldValue[plugin.locale], {
            lower: true,
            remove: /[^\w\s-]/g,
          }));
        }
      } else if (typeof fieldValue === 'string') {
        if (typeof fieldValue === 'string') {
          parts.push(slugify(fieldValue, {
            lower: true,
            remove: /[^\w\s-]/g,
          }));
        }
      }
    }
  });

  return parts.join('-');
}

window.DatoCmsPlugin.init((plugin) => {
  plugin.startAutoResizer();

  const fields = plugin.parameters.instance.fields.split(',')
    .map((a) => a.trim());

  const container = document.createElement('div');
  container.classList.add('input-group');
  container.classList.add('input-group--small');

  const addon = document.createElement('div');
  addon.classList.add('input-group__addon');
  const span = document.createElement('span');
  span.textContent = plugin.parameters.instance.prefix;
  addon.appendChild(span);

  const input = document.createElement('input');
  input.placeholder = plugin.placeholder;
  input.autocomplete = 'off';
  input.type = 'text';
  input.value = getValue(plugin, fields);

  container.appendChild(addon);
  container.appendChild(input);

  document.body.appendChild(container);

  if (plugin.getFieldValue(plugin.fieldPath) !== getValue(plugin, fields)) {
    plugin.setFieldValue(plugin.fieldPath, getValue(plugin, fields));
  }

  fields.forEach((field) => {
    plugin.addFieldChangeListener(field, () => {
      plugin.setFieldValue(plugin.fieldPath, getValue(plugin, fields));
      input.value = getValue(plugin, fields);
    });
  });
});
