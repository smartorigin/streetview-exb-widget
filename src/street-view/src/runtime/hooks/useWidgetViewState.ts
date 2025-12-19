import { useState, useCallback } from 'react';
import type { WidgetViewStateType, WidgetViewType } from '../types/general';

/**
 * Custom hook to manage the widget's view state.
 *
 * @param initialExpanded - Whether the widget should start in expanded mode
 *
 * @returns
 *   - `view` - Current view type ('default' | 'streetview' | 'expanded')
 *   - `isVisible` - Whether the widget is visible
 *   - `isAvalaible` - Whether Street View imagery is available at the current location
 *   - `isExpanded` - Whether the widget is in expanded mode
 *   - `streetViewUrl` - The Google Street View embed URL
 *   - `streetViewWebUrl` - The Google Maps web URL for the Street View location
 *
 */
export default function useWidgetViewState(initialExpanded: boolean) {
  const [state, setState] = useState<WidgetViewStateType>({
    streetViewUrl: null,
    streetViewWebUrl: null,
    view: 'default' as WidgetViewType,
    isVisible: true,
    isAvalaible: true,
    isExpanded: initialExpanded
  });

  const setIsAvalaible = useCallback((isAvalaible: boolean) => {
    setState((prev) => ({
      ...prev,
      isAvalaible
    }));
  }, []);

  const setView = useCallback((view: WidgetViewType) => {
    setState((prev) => ({
      ...prev,
      isExpanded: view === 'expanded' ? true : prev.isExpanded,
      view
    }));
  }, []);

  const setStreetViewUrl = useCallback((streetViewUrl: string) => {
    setState((prev) => ({
      ...prev,
      streetViewUrl
    }));
  }, []);

  const setStreetViewWebUrl = useCallback((streetViewWebUrl: string) => {
    setState((prev) => ({
      ...prev,
      streetViewWebUrl
    }));
  }, []);

  return {
    ...state,
    setView,
    setIsAvalaible,
    setStreetViewUrl,
    setStreetViewWebUrl,
    setState
  };
}
