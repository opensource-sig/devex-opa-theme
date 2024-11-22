import { renderHook } from "@testing-library/react";
import { useApi } from "@backstage/core-plugin-api";
import { ConfigReader } from "@backstage/config";
import { JsonObject } from "@backstage/types";
import { Config } from "../types";
import { useThemeConfig } from "./useThemeConfig";

jest.mock("@backstage/core-plugin-api", () => ({
  ...jest.requireActual("@backstage/core-plugin-api"),
  useApi: jest.fn(),
}));

const mockAppConfig = (appConfig: Config) => {
  (useApi as jest.Mock).mockReturnValue(
    ConfigReader.fromConfigs([
      { context: "", data: appConfig as unknown as JsonObject },
    ]),
  );
};

describe("useThemeConfig", () => {
  it("returns an empty config if the config contains no branding", () => {
    mockAppConfig({
      app: {},
    });
    const { result } = renderHook(() => useThemeConfig("someTheme"));
    expect(result.current).toEqual({
      mode: "light",
    });
  });

  it("returns an empty config if branding contains no theme", () => {
    mockAppConfig({
      app: {
        branding: {},
      },
    });
    const { result } = renderHook(() => useThemeConfig("someTheme"));
    expect(result.current).toEqual({
      mode: "light",
    });
  });

  it("returns the theme config when it is defined", () => {
    mockAppConfig({
      app: {
        branding: {
          theme: {
            lightTheme: {},
            darkTheme: {},
            emptyTheme: {},
            anotherTheme: {
              mode: "dark",
              palette: {
                divider: "red",
              },
            },
          },
        },
      },
    });

    const { result: lightTheme } = renderHook(() =>
      useThemeConfig("lightTheme"),
    );
    expect(lightTheme.current).toEqual({
      mode: "light",
    });

    const { result: darkTheme } = renderHook(() => useThemeConfig("darkTheme"));
    expect(darkTheme.current).toEqual({
      mode: "dark",
    });

    const { result: emptyTheme } = renderHook(() =>
      useThemeConfig("emptyTheme"),
    );
    expect(emptyTheme.current).toEqual({
      mode: "light",
    });

    const { result: anotherTheme } = renderHook(() =>
      useThemeConfig("anotherTheme"),
    );
    expect(anotherTheme.current).toEqual({
      mode: "dark",
      palette: {
        divider: "red",
      },
    });

    const { result: notFoundTheme } = renderHook(() =>
      useThemeConfig("notFoundTheme"),
    );
    expect(notFoundTheme.current).toEqual({
      mode: "light",
    });
  });
});
