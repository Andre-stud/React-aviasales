import { Checkbox } from 'antd';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { clickCheckboxFilter, checkedAllCheckbox, notCheckedAllCheckbox } from '../store/checkbox-slice';

import './menu-filter.scss';

function MenuFilter() {
  const checkboxData = [
    { nameCheckbox: 'clickAllCheckbox', label: 'Все' },
    { nameCheckbox: 'clickNonStopCheckbox', label: 'Без пересадок' },
    { nameCheckbox: 'click1TransfersCheckbox', label: '1 пересадка' },
    { nameCheckbox: 'click2TransfersCheckbox', label: '2 пересадки' },
    { nameCheckbox: 'click3TransfersCheckbox', label: '3 пересадки' },
  ];

  const activeCheckbox = useSelector((active) => active.checkbox.checkbox);

  const chackedCheckboxNameAll = activeCheckbox[0].isActive;
  const basicCheckboxesStatus =
    activeCheckbox[1].isActive &&
    activeCheckbox[2].isActive &&
    activeCheckbox[3].isActive &&
    activeCheckbox[4].isActive;

  const dispatch = useDispatch();

  useEffect(() => {
    if (basicCheckboxesStatus && !chackedCheckboxNameAll) {
      dispatch(clickCheckboxFilter('clickAllCheckbox'));
    }
  }, [basicCheckboxesStatus, chackedCheckboxNameAll, dispatch]);

  const onChange = (e) => {
    const value = e.target.name;
    dispatch(clickCheckboxFilter(value));

    if (value === 'clickAllCheckbox' && !chackedCheckboxNameAll) {
      dispatch(checkedAllCheckbox());
    }

    if (value === 'clickAllCheckbox' && chackedCheckboxNameAll) {
      dispatch(notCheckedAllCheckbox());
    }

    if (chackedCheckboxNameAll && value !== 'clickAllCheckbox') {
      dispatch(clickCheckboxFilter('clickAllCheckbox'));
    }
  };

  const checkboxElements = checkboxData.map(({ nameCheckbox, label }, index) => (
    <li key={label}>
      <Checkbox className="toggle" checked={activeCheckbox[index].isActive} name={nameCheckbox} onChange={onChange}>
        {label}{' '}
      </Checkbox>
    </li>
  ));

  return (
    <div className="menu-filter">
      <p className="number-of-transfers">Количество пересадок</p>
      <ul className="checkbox-list">{checkboxElements}</ul>
    </div>
  );
}

export default MenuFilter;
