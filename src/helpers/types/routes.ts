import { NavigateOptions } from "@tanstack/react-router";

type TDotPaths = "./" | "../" | "" | undefined;

export type TCleanedNavigateOptions = Exclude<NavigateOptions["to"], TDotPaths>;
