class KeyboardKey {
  constructor(
    value, valueLabel, rusValue, rusValueLabel, keyCode,
    row, position, width, altValue, rusAltValue, location,
  ) {
    this.value = value;
    this.valueLabel = valueLabel;
    this.rusValue = rusValue;
    this.rusValueLabel = rusValueLabel;
    this.keyCode = keyCode;
    this.row = row;
    this.position = position;
    this.width = width;
    this.alternativeValue = altValue;
    this.rusAlternativeValue = rusAltValue;
    this.location = location;
    this.id = location ? `${keyCode}_${location}` : `${keyCode}`;
  }
}
export default KeyboardKey;
